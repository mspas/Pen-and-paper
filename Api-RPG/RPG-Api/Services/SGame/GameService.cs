using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SGame;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RPG.Api.Services.SGame
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IGameToPersonRepository _gameToPersonRepository;
        private readonly IForumRepository _forumRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GameService(IGameRepository gameRepository, IGameToPersonRepository gameToPersonRepository, IForumRepository forumRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _gameToPersonRepository = gameToPersonRepository;
            _forumRepository = forumRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<GameResponse> AddGameAsync(Game game)
        {
            var gameResponse = await _gameRepository.AddGameAsync(game);

            var gameToPerson = new GameToPerson
            {
                gameId = game.Id,
                playerId = game.masterId,
                isGameMaster = true,
                isAccepted = true,
                isMadeByPlayer = true
            };
            var g2pResponse = await _gameToPersonRepository.AddG2PAsync(gameToPerson);

            await _unitOfWork.CompleteAsync();

            await _forumRepository.AddForumAsync(new Forum());
            await _unitOfWork.CompleteAsync();

            if (gameResponse.Success && g2pResponse.Success)
            {
                return gameResponse;
            }
            return new GameResponse(false, "Failed", null);
        }

        public async Task<BaseResponse> DeleteGameAsync(int gameId)
        {
            var game = await _gameRepository.GetGameAsync(gameId);
            var gameResource = _mapper.Map<Game, GameResource>(game);
            gameResource.participants.ForEach(p => _gameToPersonRepository.DeleteG2P(p));
            var response = _gameRepository.DeleteGame(game);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public Task<GameResponse> EditGameAsync(Game game)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Game>> FindGamesAsync(string data)
        {
            var foundData = new List<Game>();
            var pattern = "";

            if (Int32.TryParse(data, out int id))
            {
                var game = await _gameRepository.GetGameAsync(id);
                foundData.Add(game);
                return foundData;
            }
            else
            {
                string[] dataSearch = data.Split(".");
                if (dataSearch.Length > 0)
                {
                    if (dataSearch[0] != "")
                        pattern += "(" + dataSearch[0] + ")";
                    pattern += @"\w*(.)";

                    if (dataSearch[1] != "")
                    {
                        dataSearch[1] = dataSearch[1].Replace('&', '|');
                        pattern += "(" + dataSearch[1] + ")";
                    }
                    pattern += @"(.)";

                    if (dataSearch[2] != "")
                    {
                        if (dataSearch[2] == "Yes")
                            pattern += "(Yes)";
                        else
                            pattern += "(Yes|No)";

                    }
                    pattern += @"(.)";

                    if (dataSearch[3] != "")
                    {
                        if (dataSearch[2] == "Yes")
                            pattern += "(Yes|No)";
                        else
                            pattern += "(No)";
                    }
                }
                Regex rgx = new Regex(pattern);

                var gamesList = await _gameRepository.GetGameListAsync();

                foreach (Game game in gamesList)
                {
                    var freeSpot = false;
                    if (game.maxplayers - game.participants.Count > 0)
                        freeSpot = true;

                    var nextData = game.title + "." + game.category + ".";
                    if ((game.status == "Active" && freeSpot) || (game.status == "Ongoing" && game.hotJoin && freeSpot))
                        nextData += "Yes.";
                    else
                        nextData += "No.";

                    if (game.status == "Ended")
                        nextData += "Yes";
                    else
                        nextData += "No";

                    if (rgx.IsMatch(nextData))
                    {
                        foundData.Add(await GetGameAsync(game.Id));
                    }
                }
            }
            return foundData;
        }

        public async Task<Game> GetGameAsync(int gameId)
        {
            return await _gameRepository.GetGameAsync(gameId);
        }
    }
}
