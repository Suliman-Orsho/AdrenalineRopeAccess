using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdrenalineRopeAccess.EfCore.Migrations
{
    /// <inheritdoc />
    public partial class ProjectOutGoingsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OutGoings",
                table: "Projects");

            migrationBuilder.AddColumn<int>(
                name: "Spending",
                table: "Projects",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spending",
                table: "Projects");

            migrationBuilder.AddColumn<int>(
                name: "OutGoings",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
