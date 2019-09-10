﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using RPG.Api.Persistence;
using System;

namespace RPGApi.Migrations
{
    [DbContext(typeof(RpgDbContext))]
    [Migration("20190910123615_roles")]
    partial class roles
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RPG.Api.Domain.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("PersonalDataId");

                    b.Property<string>("email");

                    b.Property<string>("login");

                    b.Property<string>("password");

                    b.HasKey("Id");

                    b.HasIndex("PersonalDataId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Forum", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("isPublic");

                    b.Property<DateTime?>("lastActivityDate");

                    b.HasKey("Id");

                    b.ToTable("Forums");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("isAccepted");

                    b.Property<bool>("isFriendRequest");

                    b.Property<DateTime?>("lastMessageDate");

                    b.Property<int>("player1Id");

                    b.Property<int>("player2Id");

                    b.HasKey("Id");

                    b.HasIndex("player1Id");

                    b.HasIndex("player2Id");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("book");

                    b.Property<string>("category");

                    b.Property<string>("comment");

                    b.Property<DateTime>("date");

                    b.Property<string>("description");

                    b.Property<int?>("forumId");

                    b.Property<bool>("isActive");

                    b.Property<DateTime?>("lastActivityDate");

                    b.Property<string>("location");

                    b.Property<int>("masterId");

                    b.Property<bool>("needInvite");

                    b.Property<int>("nofparticipants");

                    b.Property<int>("nofplayers");

                    b.Property<string>("title");

                    b.HasKey("Id");

                    b.HasIndex("forumId");

                    b.HasIndex("masterId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.GameSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("date");

                    b.Property<int>("gameId");

                    b.Property<string>("sessionName");

                    b.HasKey("Id");

                    b.HasIndex("gameId");

                    b.ToTable("GameSessions");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.GameToPerson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("characterHealth");

                    b.Property<int>("gameId");

                    b.Property<bool>("isAccepted");

                    b.Property<bool>("isGameMaster");

                    b.Property<bool>("isMadeByPlayer");

                    b.Property<int>("playerId");

                    b.HasKey("Id");

                    b.HasIndex("gameId");

                    b.HasIndex("playerId");

                    b.ToTable("GamesToPerson");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("bodyMessage");

                    b.Property<int>("relationId");

                    b.Property<DateTime>("sendDdate");

                    b.Property<int>("senderId");

                    b.Property<bool>("wasSeen");

                    b.HasKey("Id");

                    b.HasIndex("relationId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MessageForum", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("bodyMessage");

                    b.Property<DateTime?>("editDate");

                    b.Property<int>("pageNumber");

                    b.Property<DateTime>("sendDdate");

                    b.Property<int>("senderId");

                    b.Property<int>("topicId");

                    b.HasKey("Id");

                    b.HasIndex("topicId");

                    b.ToTable("MessagesForum");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MyItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("cardId");

                    b.Property<string>("itemName");

                    b.Property<int?>("itemValue");

                    b.HasKey("Id");

                    b.HasIndex("cardId");

                    b.ToTable("MyItems");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MySkill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("cardId");

                    b.Property<string>("skillName");

                    b.Property<int>("skillValue");

                    b.HasKey("Id");

                    b.HasIndex("cardId");

                    b.ToTable("MySkills");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.NotificationData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("lastFriendNotificationDate");

                    b.Property<DateTime?>("lastFriendNotificationSeen");

                    b.Property<DateTime?>("lastGameNotificationDate");

                    b.Property<DateTime?>("lastGameNotificationSeen");

                    b.Property<DateTime?>("lastMessageDate");

                    b.Property<DateTime?>("lastMessageSeen");

                    b.HasKey("Id");

                    b.ToTable("NotificationsData");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.PersonalData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("NotificationDataId");

                    b.Property<int?>("ProfilePhotoId");

                    b.Property<int>("age");

                    b.Property<string>("city");

                    b.Property<string>("email");

                    b.Property<string>("firstname");

                    b.Property<bool>("isPhotoUploaded");

                    b.Property<string>("lastname");

                    b.Property<string>("login");

                    b.Property<string>("photoName");

                    b.HasKey("Id");

                    b.HasIndex("NotificationDataId");

                    b.HasIndex("ProfilePhotoId");

                    b.ToTable("PersonalData");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("gameId");

                    b.Property<string>("skillName");

                    b.HasKey("Id");

                    b.HasIndex("gameId");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("authorId");

                    b.Property<string>("category");

                    b.Property<DateTime>("createDate");

                    b.Property<int>("forumId");

                    b.Property<bool>("isPublic");

                    b.Property<DateTime?>("lastActivityDate");

                    b.Property<int>("lastActivityUserId");

                    b.Property<int>("messagesAmount");

                    b.Property<string>("topicName");

                    b.Property<int>("totalPages");

                    b.HasKey("Id");

                    b.HasIndex("forumId");

                    b.ToTable("Topics");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.TopicToPerson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("forumId");

                    b.Property<DateTime?>("lastActivitySeen");

                    b.Property<int>("topicId");

                    b.Property<int>("userId");

                    b.HasKey("Id");

                    b.HasIndex("topicId");

                    b.HasIndex("userId");

                    b.ToTable("TopicsToPersons");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccountId");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Account", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.PersonalData", "PersonalData")
                        .WithMany()
                        .HasForeignKey("PersonalDataId");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Friend", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.PersonalData", "player1")
                        .WithMany("MyFriends")
                        .HasForeignKey("player1Id")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RPG.Api.Domain.Models.PersonalData", "player2")
                        .WithMany("IamFriends")
                        .HasForeignKey("player2Id")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Game", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Forum", "forum")
                        .WithMany()
                        .HasForeignKey("forumId");

                    b.HasOne("RPG.Api.Domain.Models.PersonalData", "gameMaster")
                        .WithMany("MyGamesMaster")
                        .HasForeignKey("masterId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.GameSession", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Game", "game")
                        .WithMany("sessions")
                        .HasForeignKey("gameId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.GameToPerson", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Game", "game")
                        .WithMany("participants")
                        .HasForeignKey("gameId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RPG.Api.Domain.Models.PersonalData", "player")
                        .WithMany("MyGames")
                        .HasForeignKey("playerId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Message", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Friend", "relation")
                        .WithMany("Messages")
                        .HasForeignKey("relationId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MessageForum", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Topic", "topic")
                        .WithMany("Messages")
                        .HasForeignKey("topicId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MyItem", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.GameToPerson", "card")
                        .WithMany("characterItems")
                        .HasForeignKey("cardId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.MySkill", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.GameToPerson", "card")
                        .WithMany("characterSkills")
                        .HasForeignKey("cardId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.PersonalData", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.NotificationData", "NotificationData")
                        .WithMany()
                        .HasForeignKey("NotificationDataId");

                    b.HasOne("RPG.Api.Domain.Models.Photo", "ProfilePhoto")
                        .WithMany()
                        .HasForeignKey("ProfilePhotoId");
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Skill", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Game", "game")
                        .WithMany("skillSetting")
                        .HasForeignKey("gameId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.Topic", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Forum", "forum")
                        .WithMany("Topics")
                        .HasForeignKey("forumId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.TopicToPerson", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Topic", "Topic")
                        .WithMany("UsersConnected")
                        .HasForeignKey("topicId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RPG.Api.Domain.Models.NotificationData", "UserNotificationData")
                        .WithMany("topicsAccess")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RPG.Api.Domain.Models.UserRole", b =>
                {
                    b.HasOne("RPG.Api.Domain.Models.Account", "Account")
                        .WithMany("UserRoles")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RPG.Api.Domain.Models.Role", "Role")
                        .WithMany("UsersRole")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
