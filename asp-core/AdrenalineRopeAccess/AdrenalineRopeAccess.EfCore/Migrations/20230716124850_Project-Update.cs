using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdrenalineRopeAccess.EfCore.Migrations
{
    /// <inheritdoc />
    public partial class ProjectUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfWork",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "NumberOfLines",
                table: "Projects",
                newName: "LinesCount");

            migrationBuilder.RenameColumn(
                name: "MobileNumber",
                table: "Projects",
                newName: "ClientNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishDate",
                table: "Projects",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Projects",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "LinesCount",
                table: "Projects",
                newName: "NumberOfLines");

            migrationBuilder.RenameColumn(
                name: "ClientNumber",
                table: "Projects",
                newName: "MobileNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfWork",
                table: "Projects",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
