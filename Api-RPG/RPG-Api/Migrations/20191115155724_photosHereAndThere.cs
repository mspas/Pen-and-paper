using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class photosHereAndThere : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "book",
                table: "Games",
                newName: "storyDescription");

            migrationBuilder.AddColumn<int>(
                name: "MessageForumId",
                table: "Photos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "sourceId",
                table: "Photos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isPhoto",
                table: "MessagesForum",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isPhoto",
                table: "Messages",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "photoId",
                table: "Messages",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_MessageForumId",
                table: "Photos",
                column: "MessageForumId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_photoId",
                table: "Messages",
                column: "photoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Photos_photoId",
                table: "Messages",
                column: "photoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_MessagesForum_MessageForumId",
                table: "Photos",
                column: "MessageForumId",
                principalTable: "MessagesForum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Photos_photoId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_MessagesForum_MessageForumId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_MessageForumId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Messages_photoId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "MessageForumId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "sourceId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "isPhoto",
                table: "MessagesForum");

            migrationBuilder.DropColumn(
                name: "isPhoto",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "photoId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "storyDescription",
                table: "Games",
                newName: "book");
        }
    }
}
