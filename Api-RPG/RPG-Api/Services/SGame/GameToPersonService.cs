using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SGame;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SGame
{
    public class GameToPersonService : IGameToPersonService
    {
        private readonly IGameToPersonRepository _gameToPersonRepository;
        private readonly IPersonalDataRepository _personalDataRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IUnitOfWork _unitOfWork;

        public GameToPersonService(IGameToPersonRepository gameToPersonRepository, IPersonalDataRepository personalDataRepository, IGameRepository gameRepository, IUnitOfWork unitOfWork)
        {
            _gameToPersonRepository = gameToPersonRepository;
            _personalDataRepository = personalDataRepository;
            _gameRepository = gameRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<GameToPersonResponse> AddG2PAsync(GameToPerson g2p)
        {
            var response = await _gameToPersonRepository.AddG2PAsync(g2p);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> DeleteG2PAsync(int g2pId)
        {
            var g2p = await _gameToPersonRepository.GetG2PAsync(g2pId);
            var response = _gameToPersonRepository.DeleteG2P(g2p);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<GameToPersonResponse> EditG2PAsync(GameToPerson g2p)
        {
            var toUpdateG2P = await _gameToPersonRepository.GetG2PAsync(g2p.Id);
            if (toUpdateG2P == null)
            {
                return new GameToPersonResponse(false, "Connection to game not found", null);
            }

            var toUpdateGame = await _gameRepository.GetGameAsync(g2p.gameId);
            if (toUpdateGame == null)
            {
                return new GameToPersonResponse(false, "Game not found", null);
            }

            toUpdateG2P.isAccepted = true;
            toUpdateGame.nofparticipants += 1;

            var responseG2P = _gameToPersonRepository.EditG2P(toUpdateG2P);
            var responseGame = _gameRepository.EditGame(toUpdateGame);
            await _unitOfWork.CompleteAsync();

            if (responseG2P.Success && responseGame.Success)
            {
                return responseG2P;
            }
            return new GameToPersonResponse(false, "Error", null);

        }

        public async Task<GameToPerson> GetG2PAsync(int g2pId)
        {
            return await _gameToPersonRepository.GetG2PAsync(g2pId);
        }

        public async Task<List<GameToPerson>> GetG2PListAsync(string login)
        {
            var profile = await _personalDataRepository.GetProfile(login);
            return await _gameToPersonRepository.GetG2PListAsync(profile.Id);
        }
    }
}
