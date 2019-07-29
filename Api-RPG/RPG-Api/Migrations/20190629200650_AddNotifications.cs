using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class AddNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NotificationDataId",
                table: "PersonalData",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "NotificationsData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    lastMessageDate = table.Column<DateTime>(nullable: true),
                    lastNotificationDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationsData", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalData_NotificationDataId",
                table: "PersonalData",
                column: "NotificationDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalData_NotificationsData_NotificationDataId",
                table: "PersonalData",
                column: "NotificationDataId",
                principalTable: "NotificationsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalData_NotificationsData_NotificationDataId",
                table: "PersonalData");

            migrationBuilder.DropTable(
                name: "NotificationsData");

            migrationBuilder.DropIndex(
                name: "IX_PersonalData_NotificationDataId",
                table: "PersonalData");

            migrationBuilder.DropColumn(
                name: "NotificationDataId",
                table: "PersonalData");
        }
    }
}
