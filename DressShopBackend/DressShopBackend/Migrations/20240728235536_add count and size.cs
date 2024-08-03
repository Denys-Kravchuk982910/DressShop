using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DressShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class addcountandsize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Products_ProductId",
                table: "OrderProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderProducts",
                table: "OrderProducts");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "tblOrder");

            migrationBuilder.RenameTable(
                name: "OrderProducts",
                newName: "tblOrderProduct");

            migrationBuilder.RenameIndex(
                name: "IX_OrderProducts_ProductId",
                table: "tblOrderProduct",
                newName: "IX_tblOrderProduct_ProductId");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "tblOrderProduct",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "tblOrderProduct",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblOrder",
                table: "tblOrder",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProduct_Products_ProductId",
                table: "tblOrderProduct",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrderProduct_tblOrder_OrderId",
                table: "tblOrderProduct",
                column: "OrderId",
                principalTable: "tblOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProduct_Products_ProductId",
                table: "tblOrderProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrderProduct_tblOrder_OrderId",
                table: "tblOrderProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblOrderProduct",
                table: "tblOrderProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblOrder",
                table: "tblOrder");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "tblOrderProduct");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "tblOrderProduct");

            migrationBuilder.RenameTable(
                name: "tblOrderProduct",
                newName: "OrderProducts");

            migrationBuilder.RenameTable(
                name: "tblOrder",
                newName: "Orders");

            migrationBuilder.RenameIndex(
                name: "IX_tblOrderProduct_ProductId",
                table: "OrderProducts",
                newName: "IX_OrderProducts_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderProducts",
                table: "OrderProducts",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Products_ProductId",
                table: "OrderProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
