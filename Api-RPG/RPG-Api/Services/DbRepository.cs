using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Services
{
    public class DbRepository
    {
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        private readonly List<PersonalDataResource> personalDataAll = new List<PersonalDataResource>();
        private readonly List<AccountResource> allAccounts;

        public DbRepository(RpgDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);

            foreach (AccountResource a in allAccounts)
            {
                personalDataAll.Add(a.PersonalData);
            }
        }
        public List<AccountResource> GetAccounts()
        {
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            return mapper.Map<List<Account>, List<AccountResource>>(acc);
        }

        public List<PersonalDataResource> GetFriends(int id)
        {
            var friends = context.Friends.ToList();
            List<PersonalDataResource> foundFriends = null;

            foreach (Friend fr in friends)
            {
                if (fr.player1Id == id)
                    foundFriends = personalDataAll.FindAll(ob => ob.Id == fr.player2Id);
                if (fr.player2Id == id)
                    foundFriends = personalDataAll.FindAll(ob => ob.Id == fr.player1Id);
            }
            return foundFriends;
        }

        public List<MySkill> GetMySkillsToCard(int cardId)
        {
            var skills = context.MySkills.ToList();
            var foundSkills = new List<MySkill>();

            foreach (MySkill skill in skills)
            {
                if (skill.cardId == cardId)
                {
                    foundSkills.Add(skill);
                }
            }

            return foundSkills;

        }

        public List<MyItem> GetMyItemsToCard(int cardId)
        {
            var items = context.MyItems.ToList();
            var foundItems = new List<MyItem>();

            foreach (MyItem item in items)
            {
                if (item.cardId == cardId)
                {
                    foundItems.Add(item);
                }
            }

            return foundItems;

        }


        public List<GameToPersonResource> GetPlayersGames(int userId)
        {
            var game2persons = context.GamesToPerson.ToList();
            var games = context.Games.ToList();
            var foundSkills = new List<MySkill>();
            var foundItems = new List<MyItem>();
            var foundConnections = new List<GameToPersonResource>();
            var foundGame = new Game();

            foreach (GameToPerson g2p in game2persons)
            {
                if (g2p.playerId == userId)
                {
                    foundSkills = GetMySkillsToCard(g2p.Id);
                    foundItems = GetMyItemsToCard(g2p.Id);
                    foreach (Game game in games)
                    {
                        if (g2p.gameId == game.Id)
                        {
                            foundGame = game;
                            var g2pConnection =
                                new GameToPersonResource(g2p.Id, g2p.gameId, g2p.playerId, g2p.isGameMaster, g2p.isAccepted, g2p.isMadeByPlayer, g2p.characterHealth,
                                                         game, foundSkills, foundItems);
                            foundConnections.Add(g2pConnection);
                            break;
                        }
                    }
                }
            }
            return foundConnections;
        }

        public GameResource GetGame(int id)
        {
            var game2persons = context.GamesToPerson.ToList();
            var games = context.Games.ToList();
            var skills = context.Skills.ToList();
            var sessions = context.GameSessions.ToList();
            var gameMaster = new PersonalDataResource();
            var participants = new List<PersonalDataResource>();
            var skillSetting = new List<SkillResource>();
            var foundSessions = new List<GameSession>();
            var foundConnections = new List<GameToPersonResource>();
            var foundSkills = new List<MySkill>();
            var foundItems = new List<MyItem>();
            GameResource foundGame = null;

            foreach (Game game in games)
            {
                if (game.Id == id)
                {
                    foreach (GameToPerson g2p in game2persons)
                    {
                        if (g2p.gameId == game.Id)
                        {

                            foundSkills = GetMySkillsToCard(g2p.Id);
                            foundItems = GetMyItemsToCard(g2p.Id);
                            var g2pConnection =
                                new GameToPersonResource(g2p.Id, g2p.gameId, g2p.playerId, g2p.isGameMaster, g2p.isAccepted, g2p.isMadeByPlayer, g2p.characterHealth,
                                                         null, foundSkills, foundItems);
                            foundConnections.Add(g2pConnection);

                            foreach (PersonalDataResource person in personalDataAll)
                            {
                                if (person.Id == g2p.playerId)
                                {
                                    participants.Add(person);
                                }
                                if (person.Id == game.masterId)
                                {
                                    gameMaster = person;
                                }
                            }
                        }
                    }
                    foreach (Skill skill in skills)
                    {
                        if (skill.gameId == game.Id)
                        {
                            var s = new SkillResource(skill.Id, skill.skillName, skill.gameId);
                            skillSetting.Add(s);
                        }
                    }
                    foreach (GameSession session in sessions)
                    {
                        if (session.gameId == game.Id)
                        {
                            foundSessions.Add(session);
                        }
                    }
                    foundGame =
                        new GameResource(game.Id, game.masterId, game.title, game.category, game.nofparticipants, game.nofplayers, game.description, game.location, 
                                         game.book, game.comment, game.date, game.needInvite, game.isActive, gameMaster, participants, skillSetting, foundSessions, foundConnections);
                }
            }
            return foundGame;
        }

        public Game GetGame2(int id)
        {
            var allGames = context.Games.Include(mbox => mbox.gameMaster).Include(mbox => mbox.participants).Include(mbox => mbox.sessions).Include(mbox => mbox.skillSetting).ToList();
            foreach (Game game in allGames)
            {
                if (game.Id == id)
                {
                    return game;
                }
            }
            return null;
        }


    }
}
