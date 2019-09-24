using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.Profile;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.Profile
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IFriendRepository _friendRepository;
        private readonly IUnitOfWork _unitOfWork;

        public MessageService(IMessageRepository messageRepository, INotificationRepository notificationRepository, IFriendRepository friendRepository, IUnitOfWork unitOfWork)
        {
            _messageRepository = messageRepository;
            _notificationRepository = notificationRepository;
            _friendRepository = friendRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse> AddMessageAsync(Message message)
        {
            var toUpdateRelation = await _friendRepository.GetFriendAsync(message.relationId);

            int notificationId;
            if (toUpdateRelation.player1Id == message.senderId)
                notificationId = toUpdateRelation.player2Id;
            else
                notificationId = toUpdateRelation.player1Id;

            var toUpdateNotif = await _notificationRepository.GetNotificationDataAsync(notificationId);
            toUpdateNotif.lastMessageDate = message.sendDdate;
            toUpdateRelation.lastMessageDate = message.sendDdate;

            var responseNotif = _notificationRepository.UpdateNotificationDataAsync(toUpdateNotif);
            var responseRelation = _friendRepository.UpdateNotificationFriend(toUpdateRelation);
            var responseMessage = await _messageRepository.AddMessageAsync(message);
            await _unitOfWork.CompleteAsync();

            if (responseNotif.Success && responseRelation.Success && responseMessage.Success)
            {
                return responseMessage;
            }
            return new BaseResponse(false, "Update error");
        }

        public async Task<BaseResponse> DeleteMessageAsync(int messageId)
        {
            var message = await _messageRepository.GetMessageAsync(messageId);
            var response = _messageRepository.DeleteMessageAsync(message);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<MessageResponse> EditMessageAsync(int messageId)
        {
            var toUpdate = await _messageRepository.GetMessageAsync(messageId);
            if (toUpdate == null)
            {
                return new MessageResponse(false, null, null);
            }

            toUpdate.wasSeen = true;

            var response = _messageRepository.EditMessageAsync(toUpdate);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<Message> GetMessageAsync(int messageId)
        {
            return await _messageRepository.GetMessageAsync(messageId);
        }

        public async Task<List<Message>> GetMessageListAsync(int relationId)
        {
           return await  _messageRepository.GetMessageListAsync(relationId);
        }
    }
}
