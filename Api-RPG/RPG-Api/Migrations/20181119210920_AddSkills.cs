using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class AddSkills : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "book",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "comment",
                table: "Games",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MySkills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    cardId = table.Column<int>(nullable: false),
                    skillName = table.Column<string>(nullable: true),
                    skillValue = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MySkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MySkills_GamesToPerson_cardId",
                        column: x => x.cardId,
                        principalTable: "GamesToPerson",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    gameId = table.Column<int>(nullable: false),
                    skillName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skills_Games_gameId",
                        column: x => x.gameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MySkills_cardId",
                table: "MySkills",
                column: "cardId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_gameId",
                table: "Skills",
                column: "gameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MySkills");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropColumn(
                name: "book",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "comment",
                table: "Games");
        }
    }
}
