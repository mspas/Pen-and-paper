using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class notificationFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastNotificationDate",
                table: "NotificationsData",
                newName: "lastGameNotificationDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "lastFriendNotificationDate",
                table: "NotificationsData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastFriendNotificationDate",
                table: "NotificationsData");

            migrationBuilder.RenameColumn(
                name: "lastGameNotificationDate",
                table: "NotificationsData",
                newName: "lastNotificationDate");
        }
    }
}
