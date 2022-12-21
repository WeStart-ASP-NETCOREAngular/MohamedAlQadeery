﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.API.Data.Migrations
{
    public partial class MakeSlugColNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "StaticPages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

         }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "StaticPages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

          

        
         }
    }
}
