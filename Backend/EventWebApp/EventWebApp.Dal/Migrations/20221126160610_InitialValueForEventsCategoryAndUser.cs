using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventWebApp.Dal.Migrations
{
    public partial class InitialValueForEventsCategoryAndUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2270));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2305));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2403));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2406));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2408));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 18, 6, 10, 610, DateTimeKind.Local).AddTicks(2409));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6615));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6649));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6762));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6765));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6767));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6769));
        }
    }
}
