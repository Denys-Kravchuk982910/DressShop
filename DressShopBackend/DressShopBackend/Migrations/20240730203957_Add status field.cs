using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DressShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class Addstatusfield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "tblOrder",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "active");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "tblOrder");
        }
    }
}
