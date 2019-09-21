using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services
{
    public class FriendService : IFriendService
    {
        private readonly IFriendRepository _friendRepository;
        private readonly IPersonalDataRepository _personalDataRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FriendService(IFriendRepository friendRepository, IPersonalDataRepository personalDataRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _friendRepository = friendRepository;
            _personalDataRepository = personalDataRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<FriendResponse> AddFriendAsync(Friend friend)
        {
            var response = await _friendRepository.AddFriendAsync(friend);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> DeleteFriendAsync(int friendId)
        {
            var friend = await _friendRepository.GetFriendAsync(friendId);
            var response =  _friendRepository.DeleteFriend(friend);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<FriendResponse> EditFriendAsync(FriendResource newFriendData)
        {
            var friend = await _friendRepository.GetFriendAsync(newFriendData.Id);
            var response = _friendRepository.EditFriend(newFriendData, friend);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<FriendResource> GetFriendAsync(int userId, int friendId)
        {
            var friend = await _friendRepository.GetFriendAsync(friendId);
            return await CreateFriendResourceAsync(userId, friend);
        }

        public async Task<List<FriendResource>> GetFriendsListAsync(int userId)
        {
            var friendResourcesList = new List<FriendResource>();
            var friendsList = await _friendRepository.GetFriendListAsync(userId);
            foreach(Friend friend in friendsList)
            {
                var data = await CreateFriendResourceAsync(userId, friend);
                friendResourcesList.Add(data);
            }
            return friendResourcesList;
        }

        public async Task<FriendResource> GetFriendForTimestampAsync(int friendId)
        {
            var friend = await _friendRepository.GetFriendAsync(friendId);
            var friendResource = _mapper.Map<Friend, FriendResource>(friend);
            friendResource.PersonalData = null;
            friendResource.isReceiver = true;

            return friendResource;
        }



        private async Task<PersonalData> GetFriendProfileAsync(int userId, Friend friend)
        {
            if (userId == friend.player1Id)
            {
                return await _personalDataRepository.GetProfile(friend.player2Id);
            }
            return await _personalDataRepository.GetProfile(friend.player1Id);
        }

        private async Task<FriendResource> CreateFriendResourceAsync(int userId, Friend friend)
        {
            var friendResource = _mapper.Map<Friend, FriendResource>(friend);
            var profile = await GetFriendProfileAsync(userId, friend);

            friendResource.PersonalData = _mapper.Map<PersonalData, PersonalDataResource>(profile);
            friendResource.isReceiver = CheckReceiver(userId, friend);

            return friendResource;
        }

        private bool CheckReceiver(int userId, Friend friend)
        {
            if (userId == friend.player1Id)
            {
                return false;
            }
            return true;
        }
    }
}
