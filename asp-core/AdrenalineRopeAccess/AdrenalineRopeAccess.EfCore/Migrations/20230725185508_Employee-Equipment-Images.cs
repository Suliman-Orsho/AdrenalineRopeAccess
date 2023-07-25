using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdrenalineRopeAccess.EfCore.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeEquipmentImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EquipmentImages_EquipmentId",
                table: "EquipmentImages",
                column: "EquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeImages_EmployeeId",
                table: "EmployeeImages",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeImages_Employees_EmployeeId",
                table: "EmployeeImages",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentImages_Equipments_EquipmentId",
                table: "EquipmentImages",
                column: "EquipmentId",
                principalTable: "Equipments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeImages_Employees_EmployeeId",
                table: "EmployeeImages");

            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentImages_Equipments_EquipmentId",
                table: "EquipmentImages");

            migrationBuilder.DropIndex(
                name: "IX_EquipmentImages_EquipmentId",
                table: "EquipmentImages");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeImages_EmployeeId",
                table: "EmployeeImages");
        }
    }
}
