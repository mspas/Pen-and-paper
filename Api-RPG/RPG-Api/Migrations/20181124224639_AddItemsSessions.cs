using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class AddItemsSessions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "age",
                table: "PersonalData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "PersonalData",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "characterHealth",
                table: "GamesToPerson",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "GameSessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    date = table.Column<DateTime>(nullable: false),
                    gameId = table.Column<int>(nullable: false),
                    sessionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameSessions_Games_gameId",
                        column: x => x.gameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MyItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    cardId = table.Column<int>(nullable: false),
                    itemName = table.Column<string>(nullable: true),
                    itemValue = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MyItems_GamesToPerson_cardId",
                        column: x => x.cardId,
                        principalTable: "GamesToPerson",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameSessions_gameId",
                table: "GameSessions",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_MyItems_cardId",
                table: "MyItems",
                column: "cardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameSessions");

            migrationBuilder.DropTable(
                name: "MyItems");

            migrationBuilder.DropColumn(
                name: "age",
                table: "PersonalData");

            migrationBuilder.DropColumn(
                name: "city",
                table: "PersonalData");

            migrationBuilder.DropColumn(
                name: "characterHealth",
                table: "GamesToPerson");
        }
    }
}
