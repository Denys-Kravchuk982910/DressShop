using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DressShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class Addorderfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Deliver",
                table: "tblOrder",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "tblOrder",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "tblOrder",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "tblOrder",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "tblOrder",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deliver",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "tblOrder");
        }
    }
}
