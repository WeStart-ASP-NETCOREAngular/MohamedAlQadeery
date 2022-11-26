using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventWebApp.Dal.Migrations
{
    public partial class MadeDeletedAtNullableAndGiveInitialValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DeletedAt",
                table: "Tags",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

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
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6762), null });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6765), null });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6767), null });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 16, 3, 38, 974, DateTimeKind.Local).AddTicks(6769), null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DeletedAt",
                table: "Tags",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7525));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7559));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7697), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7700), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7702), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedAt", "DeletedAt" },
                values: new object[] { new DateTime(2022, 11, 26, 15, 59, 40, 727, DateTimeKind.Local).AddTicks(7704), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }
    }
}
