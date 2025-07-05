using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimplePlanePerformance.Core.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCruiseFuelLitersPerHour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "CruiseFuelLitersPerHour",
                table: "Aircraft",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CruiseFuelLitersPerHour",
                table: "Aircraft");
        }
    }
}
