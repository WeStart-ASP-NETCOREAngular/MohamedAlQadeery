using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventWebApp.Dal.Migrations
{
    public partial class SeedingCategoryAndTags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7525), null, "Sport" },
                    { 2, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7559), null, "Gaming" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7697), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "WorldCup" },
                    { 2, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7700), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "FPS" },
                    { 3, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7702), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Music" },
                    { 4, new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7704), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "FIFA" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
