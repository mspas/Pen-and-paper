using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class AddNotificationSeen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "lastFriendNotificationSeen",
                table: "NotificationsData",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "lastGameNotificationSeen",
                table: "NotificationsData",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "lastMessageSeen",
                table: "NotificationsData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastFriendNotificationSeen",
                table: "NotificationsData");

            migrationBuilder.DropColumn(
                name: "lastGameNotificationSeen",
                table: "NotificationsData");

            migrationBuilder.DropColumn(
                name: "lastMessageSeen",
                table: "NotificationsData");
        }
    }
}
