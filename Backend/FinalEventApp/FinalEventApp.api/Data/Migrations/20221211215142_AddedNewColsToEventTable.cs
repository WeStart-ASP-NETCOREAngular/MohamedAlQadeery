using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalEventApp.api.Data.Migrations
{
    public partial class AddedNewColsToEventTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "65574566-fef6-4857-903b-af23c2d795e9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "66d04650-daa7-4e23-92db-fd613a6518bc", new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4550), "AQAAAAEAACcQAAAAEBbOiP2GzV+yeSJayIwyX5LoGiGkOSsJlwlkZC5bggb25V48r/NHmJuvZi5G2AKFmw==", "8fb8340b-a5ce-4483-ae6d-888a15b6fac6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b5feebcf-f317-4117-81c5-f95c98e3999e",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e5165188-28b2-425f-897e-ee984e05e53a", new DateTime(2022, 12, 11, 23, 51, 41, 649, DateTimeKind.Local).AddTicks(1669), "AQAAAAEAACcQAAAAEIEIrRN+bNwX8PVpi6h0UIKDv0d1zriyoMRLTGJ0jqWWy/Zs7eIUfTg+h9oFFVSkWA==", "a73c2768-7157-4b7b-8c02-fb5b500e20d1" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4300));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4333));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4434));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4438));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4440));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 11, 23, 51, 41, 643, DateTimeKind.Local).AddTicks(4441));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Events");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "65574566-fef6-4857-903b-af23c2d795e9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7fdf7b93-04c8-489c-8e3d-485bd02014b7", new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3225), "AQAAAAEAACcQAAAAEC0r0vl1TX3GODqcrDkHEcGTT8QDAK8IyS31/S+MbSLFS+nogX9N2A9hUOKyUlq7aA==", "a8241e0b-4686-4a62-a6d5-6c808a597794" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b5feebcf-f317-4117-81c5-f95c98e3999e",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5d5b300-45b8-4762-94ca-c38a4e21866d", new DateTime(2022, 12, 9, 16, 42, 47, 381, DateTimeKind.Local).AddTicks(3437), "AQAAAAEAACcQAAAAEFUXgkOBvnnDGRe9VIjGNIN2oy0YIUOCSgUbkEfBdHX44tQgHPYBE+8p//3LrYRTTw==", "5106cc4f-6f7e-4485-9a9b-997878a790be" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(2964));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3000));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3106));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3109));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3111));

            migrationBuilder.UpdateData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2022, 12, 9, 16, 42, 47, 375, DateTimeKind.Local).AddTicks(3112));
        }
    }
}
