using RPG.Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence
{
    public class RpgDbContext : DbContext
    {
        public RpgDbContext(DbContextOptions<RpgDbContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameToPerson> GamesToPerson { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<MySkill> MySkills { get; set; }
        public DbSet<MyItem> MyItems { get; set; }
        public DbSet<GameSession> GameSessions { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<NotificationData> NotificationsData { get; set; }
        public DbSet<Forum> Forums { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<MessageForum> MessagesForum { get; set; }
        public DbSet<TopicToPerson> TopicsToPersons { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Friend>()
                        .HasOne(m => m.player1)
                        .WithMany(t => t.MyFriends)
                        .HasForeignKey(m => m.player1Id)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friend>()
                        .HasOne(m => m.player2)
                        .WithMany(t => t.IamFriends)
                        .HasForeignKey(m => m.player2Id)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GameToPerson>()
                        .HasOne(m => m.player)
                        .WithMany(t => t.MyGames)
                        .HasForeignKey(m => m.playerId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GameToPerson>()
                        .HasOne(m => m.game)
                        .WithMany(t => t.participants)
                        .HasForeignKey(m => m.gameId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Game>()
                        .HasOne(m => m.gameMaster)
                        .WithMany(t => t.MyGamesMaster)
                        .HasForeignKey(m => m.masterId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Skill>()
                        .HasOne(m => m.game)
                        .WithMany(t => t.skillSetting)
                        .HasForeignKey(m => m.gameId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GameSession>()
                        .HasOne(m => m.game)
                        .WithMany(t => t.sessions)
                        .HasForeignKey(m => m.gameId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MyItem>()
                        .HasOne(m => m.card)
                        .WithMany(t => t.characterItems)
                        .HasForeignKey(m => m.cardId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MySkill>()
                        .HasOne(m => m.card)
                        .WithMany(t => t.characterSkills)
                        .HasForeignKey(m => m.cardId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                        .HasOne(m => m.relation)
                        .WithMany(t => t.Messages)
                        .HasForeignKey(m => m.relationId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Topic>()
                        .HasOne(m => m.forum)
                        .WithMany(t => t.Topics)
                        .HasForeignKey(m => m.forumId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MessageForum>()
                        .HasOne(m => m.topic)
                        .WithMany(t => t.Messages)
                        .HasForeignKey(m => m.topicId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MessageForum>()
                        .HasOne(m => m.topic)
                        .WithMany(t => t.Messages)
                        .HasForeignKey(m => m.topicId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TopicToPerson>()
                        .HasOne(m => m.UserNotificationData)
                        .WithMany(t => t.topicsAccess)
                        .HasForeignKey(m => m.userId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TopicToPerson>()
                        .HasOne(m => m.Topic)
                        .WithMany(t => t.UsersConnected)
                        .HasForeignKey(m => m.topicId)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
