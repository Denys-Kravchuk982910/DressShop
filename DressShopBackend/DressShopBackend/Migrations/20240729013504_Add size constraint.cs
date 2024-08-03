using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DressShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class Addsizeconstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct",
                columns: new[] { "OrderId", "ProductId", "Size" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct",
                columns: new[] { "OrderId", "ProductId" });
        }
    }
}
