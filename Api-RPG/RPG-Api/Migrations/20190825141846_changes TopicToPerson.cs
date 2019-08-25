using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class changesTopicToPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPermissions");

            migrationBuilder.DropColumn(
                name: "forumName",
                table: "Forums");

            migrationBuilder.AddColumn<DateTime>(
                name: "editDate",
                table: "MessagesForum",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "TopicsToPersons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    forumId = table.Column<int>(nullable: false),
                    lastActivitySeen = table.Column<DateTime>(nullable: true),
                    topicId = table.Column<int>(nullable: false),
                    userId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopicsToPersons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TopicsToPersons_Topics_topicId",
                        column: x => x.topicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TopicsToPersons_NotificationsData_userId",
                        column: x => x.userId,
                        principalTable: "NotificationsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TopicsToPersons_topicId",
                table: "TopicsToPersons",
                column: "topicId");

            migrationBuilder.CreateIndex(
                name: "IX_TopicsToPersons_userId",
                table: "TopicsToPersons",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TopicsToPersons");

            migrationBuilder.DropColumn(
                name: "editDate",
                table: "MessagesForum");

            migrationBuilder.AddColumn<string>(
                name: "forumName",
                table: "Forums",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserPermissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    topicId = table.Column<int>(nullable: false),
                    userId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPermissions_Topics_topicId",
                        column: x => x.topicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserPermissions_GamesToPerson_userId",
                        column: x => x.userId,
                        principalTable: "GamesToPerson",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_topicId",
                table: "UserPermissions",
                column: "topicId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_userId",
                table: "UserPermissions",
                column: "userId");
        }
    }
}
