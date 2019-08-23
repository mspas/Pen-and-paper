using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class Forumv10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "forumId",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "lastActivityDate",
                table: "Games",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Forums",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    forumName = table.Column<string>(nullable: true),
                    isPublic = table.Column<bool>(nullable: false),
                    lastActivityDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    forumId = table.Column<int>(nullable: false),
                    isPublic = table.Column<bool>(nullable: false),
                    lastActivityDate = table.Column<DateTime>(nullable: true),
                    topicName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_Forums_forumId",
                        column: x => x.forumId,
                        principalTable: "Forums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MessagesForum",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    bodyMessage = table.Column<string>(nullable: true),
                    sendDdate = table.Column<DateTime>(nullable: false),
                    senderId = table.Column<int>(nullable: false),
                    topicId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagesForum", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessagesForum_Topics_topicId",
                        column: x => x.topicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "IX_Games_forumId",
                table: "Games",
                column: "forumId");

            migrationBuilder.CreateIndex(
                name: "IX_MessagesForum_topicId",
                table: "MessagesForum",
                column: "topicId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_forumId",
                table: "Topics",
                column: "forumId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_topicId",
                table: "UserPermissions",
                column: "topicId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_userId",
                table: "UserPermissions",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Forums_forumId",
                table: "Games",
                column: "forumId",
                principalTable: "Forums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Forums_forumId",
                table: "Games");

            migrationBuilder.DropTable(
                name: "MessagesForum");

            migrationBuilder.DropTable(
                name: "UserPermissions");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropTable(
                name: "Forums");

            migrationBuilder.DropIndex(
                name: "IX_Games_forumId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "forumId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "lastActivityDate",
                table: "Games");
        }
    }
}
