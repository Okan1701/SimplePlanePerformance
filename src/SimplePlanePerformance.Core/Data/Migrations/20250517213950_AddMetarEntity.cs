using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplePlanePerformance.Core.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMetarEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Aircrafts",
                table: "Aircrafts");

            migrationBuilder.RenameTable(
                name: "Aircrafts",
                newName: "Aircraft");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Aircraft",
                table: "Aircraft",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Metar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Station = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Observed = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WindDirection = table.Column<int>(type: "int", nullable: false),
                    WindSpeedKnots = table.Column<int>(type: "int", nullable: false),
                    AltimeterPressureHpa = table.Column<double>(type: "float", nullable: false),
                    AltimeterPressureHg = table.Column<double>(type: "float", nullable: false),
                    CeilingFeet = table.Column<int>(type: "int", nullable: false),
                    RawMetar = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metar", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Metar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Aircraft",
                table: "Aircraft");

            migrationBuilder.RenameTable(
                name: "Aircraft",
                newName: "Aircrafts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Aircrafts",
                table: "Aircrafts",
                column: "Id");
        }
    }
}
