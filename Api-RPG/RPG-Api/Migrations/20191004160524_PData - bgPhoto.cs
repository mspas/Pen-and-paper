using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RPGApi.Migrations
{
    public partial class PDatabgPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BackgroundPhotoId",
                table: "PersonalData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bgPhotoName",
                table: "PersonalData",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PersonalData_BackgroundPhotoId",
                table: "PersonalData",
                column: "BackgroundPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalData_Photos_BackgroundPhotoId",
                table: "PersonalData",
                column: "BackgroundPhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalData_Photos_BackgroundPhotoId",
                table: "PersonalData");

            migrationBuilder.DropIndex(
                name: "IX_PersonalData_BackgroundPhotoId",
                table: "PersonalData");

            migrationBuilder.DropColumn(
                name: "BackgroundPhotoId",
                table: "PersonalData");

            migrationBuilder.DropColumn(
                name: "bgPhotoName",
                table: "PersonalData");
        }
    }
}
