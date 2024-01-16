using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberRoleToAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "72560c55-44d2-450b-b52a-ff524002efad");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1ad081d-c96e-4f4a-9cf7-5af6059ce651");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4363be63-9c55-4b02-b137-a27442573e14", null, "Member", "MEMBER" },
                    { "6fd4af9e-de91-48d0-8cb9-998c46634158", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4363be63-9c55-4b02-b137-a27442573e14");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6fd4af9e-de91-48d0-8cb9-998c46634158");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "72560c55-44d2-450b-b52a-ff524002efad", null, "Member", "MEMBER" },
                    { "d1ad081d-c96e-4f4a-9cf7-5af6059ce651", null, "Admin", "ADMIN" },
                    
                });
        }
    }
}
