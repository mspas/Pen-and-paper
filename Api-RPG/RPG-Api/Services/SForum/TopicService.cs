using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SForum;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SForum
{
    public class TopicService : ITopicService
    {
        private readonly ITopicRepository _topicRepository;
        private readonly ITopicToPersonRepository _topicToPersonRepository;
        private readonly IMessageForumRepository _messageForumRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TopicService(ITopicRepository topicRepository, ITopicToPersonRepository topicToPersonRepository, IMessageForumRepository messageForumRepository, IGameRepository gameRepository, IUnitOfWork unitOfWork)
        {
            _topicRepository = topicRepository;
            _topicToPersonRepository = topicToPersonRepository;
            _messageForumRepository = messageForumRepository;
            _gameRepository = gameRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<TopicResponse> AddTopicAsync(Topic topic, string bodyMessage)
        {
            var message = new MessageForum(topic.createDate, bodyMessage, topic.authorId, 1);

            var game = await _gameRepository.GetGameAsync(topic.forumId);

            var responseTopic = await _topicRepository.AddTopicAsync(topic);
            await _unitOfWork.CompleteAsync();

            message.topicId = topic.Id;

            var responseT2P = new TopicToPersonResponse(true, null, null);
            if (topic.isPublic)
            {
                foreach (GameToPerson player in game.participants)
                {
                    var t2p = new TopicToPerson(topic.forumId, topic.Id, player.playerId, topic.createDate.AddHours(-1));
                    if (player.Id == topic.authorId)
                        t2p.lastActivitySeen = topic.createDate;
                    responseT2P = await _topicToPersonRepository.AddT2PAsync(t2p);
                }
            }
            var responseMsg = await _messageForumRepository.AddMessageAsync(message);
            await _unitOfWork.CompleteAsync();

            if (!responseTopic.Success)
                return new TopicResponse(false, "Failed topic creation", null);
            if (!responseT2P.Success)
                return new TopicResponse(false, "Failed to create connection to topic", null);
            if (!responseMsg.Success)
                return new TopicResponse(false, "Failed to post message to topic", null);
            return responseTopic;
        }

        public async Task<BaseResponse> DeleteTopicAsync(int topicId)
        {
            var topic = await _topicRepository.GetTopicAsync(topicId);
            var response = _topicRepository.DeleteTopic(topic);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<TopicResponse> EditTopicAsync(Topic topic)
        {
            var toUpdate = await _topicRepository.GetTopicAsync(topic.Id);
            if (toUpdate == null)
            {
                return new TopicResponse(false, "Topic not found", null);
            }

            toUpdate.lastActivityDate = topic.lastActivityDate;
            toUpdate.isPublic = topic.isPublic;
            toUpdate.topicName = topic.topicName;
            toUpdate.totalPages = topic.totalPages;

            var response = _topicRepository.EditTopic(topic);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<Topic> GetTopicAsync(int userId, int topicId)
        {
            var topic = await _topicRepository.GetTopicAsync(topicId);
            if (topic.isPublic == false)
            {
                if (topic.UsersConnected.Count > 0)
                {
                    foreach (TopicToPerson per in topic.UsersConnected)
                    {
                        if (per.userId == userId)
                            return topic;
                    }
                    return null;
                }
                else
                    return null;
            }
            return topic;
        }

        public async Task<List<Topic>> GetTopicListAsync(int forumId)
        {
            return await _topicRepository.GetTopicListAsync(forumId);
        }
    }
}
