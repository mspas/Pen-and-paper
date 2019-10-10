using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SForum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SForum
{
    public class MessageForumService : IMessageForumService
    {
        private readonly IForumRepository _forumRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly ITopicToPersonRepository _topicToPersonRepository;
        private readonly IMessageForumRepository _messageForumRepository;
        private readonly IGameRepository _gameRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUnitOfWork _unitOfWork;

        public MessageForumService(IForumRepository forumRepository, ITopicRepository topicRepository, ITopicToPersonRepository topicToPersonRepository, IMessageForumRepository messageForumRepository, IGameRepository gameRepository, INotificationRepository notificationRepository, IUnitOfWork unitOfWork)
        {
            _forumRepository = forumRepository;
            _topicRepository = topicRepository;
            _topicToPersonRepository = topicToPersonRepository;
            _messageForumRepository = messageForumRepository;
            _gameRepository = gameRepository;
            _notificationRepository = notificationRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<MessageForumResponse> AddMessageAsync(MessageForum message)
        {
            var toUpdateTopic = await _topicRepository.GetTopicAsync(message.topicId);
            var toUpdateForum = await _forumRepository.GetForumAsync(toUpdateTopic.forumId);
            var toUpdateGame = await _gameRepository.GetGameAsync(toUpdateForum.Id);

            toUpdateTopic.lastActivityDate = message.sendDdate;
            toUpdateForum.lastActivityDate = message.sendDdate;
            toUpdateGame.lastActivityDate = message.sendDdate;

            var responseNotif = new BaseResponse(true, null);

            foreach (GameToPerson player in toUpdateGame.participants)
            {
                foreach (TopicToPerson per in toUpdateTopic.UsersConnected)
                {
                    if (player.playerId == per.userId && player.playerId != message.senderId)
                    {
                        var toUpdateNotification = await _notificationRepository.GetNotificationDataAsync(player.playerId);
                        toUpdateNotification.lastGameNotificationDate = message.sendDdate;
                        var response = _notificationRepository.UpdateNotificationDataAsync(toUpdateNotification);
                        if (!response.Success)
                            responseNotif = new BaseResponse(false, "Notification-Set not found");
                    }
                }
            }

            int pages = toUpdateTopic.Messages.Count() / 10;
            int modpages = toUpdateTopic.Messages.Count() % 10;

            if (pages >= toUpdateTopic.totalPages && modpages >= 0)
            {
                toUpdateTopic.totalPages += 1;
            }
            toUpdateTopic.messagesAmount += 1;

            var responseTopic = _topicRepository.EditTopic(toUpdateTopic);
            var responseForum = _forumRepository.EditForum(toUpdateForum);
            var responseGame = _gameRepository.EditGame(toUpdateGame);
            var responseMsg = await _messageForumRepository.AddMessageAsync(message);
            await _unitOfWork.CompleteAsync();

            if (!responseTopic.Success)
                return new MessageForumResponse(false, "Failed topic update", null);
            if (!responseForum.Success)
                return new MessageForumResponse(false, "Failed forum update", null);
            if (!responseGame.Success)
                return new MessageForumResponse(false, "Failed game update", null);
            if (!responseNotif.Success)
                return new MessageForumResponse(false, "Failed notification update", null);
            return responseMsg;
        }

        public async Task<BaseResponse> DeleteMessageAsync(int messageId)
        {
            var toDelete = await _messageForumRepository.GetMessageAsync(messageId);
            if (toDelete == null)
            {
                return new MessageForumResponse(false, "Message not found", null);
            }

            var response = _messageForumRepository.DeleteMessage(toDelete);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<MessageForumResponse> EditMessageAsync(MessageForum message)
        {
            var toUpdate = await _messageForumRepository.GetMessageAsync(message.Id);
            if (toUpdate == null)
            {
                return new MessageForumResponse(false, "Message not found", null);
            }

            toUpdate.bodyMessage = message.bodyMessage;
            toUpdate.editDate = message.editDate;

            var response = _messageForumRepository.EditMessage(message);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<MessageForum> GetMessageAsync(int messageId)
        {
           return await _messageForumRepository.GetMessageAsync(messageId);
        }

        public async Task<List<MessageForum>> GetMessageListAsync(int topicId, int page)
        {
            if (page > 0)
                return await _messageForumRepository.GetMessageListWithPageAsync(topicId, page);
            return await _messageForumRepository.GetMessageListAsync(topicId);

        }
    }
}
