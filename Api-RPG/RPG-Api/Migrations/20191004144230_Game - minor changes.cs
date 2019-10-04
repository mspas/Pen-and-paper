using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class Gameminorchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Games");

            migrationBuilder.RenameColumn(
                name: "location",
                table: "Games",
                newName: "status");

            migrationBuilder.AddColumn<int>(
                name: "BackgroundPhotoId",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfilePhotoId",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bgPhotoName",
                table: "Games",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "photoName",
                table: "Games",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Games_BackgroundPhotoId",
                table: "Games",
                column: "BackgroundPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_ProfilePhotoId",
                table: "Games",
                column: "ProfilePhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Photos_BackgroundPhotoId",
                table: "Games",
                column: "BackgroundPhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Photos_ProfilePhotoId",
                table: "Games",
                column: "ProfilePhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Photos_BackgroundPhotoId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Photos_ProfilePhotoId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_BackgroundPhotoId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_ProfilePhotoId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "BackgroundPhotoId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "ProfilePhotoId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "bgPhotoName",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "photoName",
                table: "Games");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Games",
                newName: "location");

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Games",
                nullable: false,
                defaultValue: false);
        }
    }
}
