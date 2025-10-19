import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NewFlightPerformanceService } from "../../services/newflight-performance.service";
import { map, Observable } from "rxjs";
import { FuelCalculation } from "../../models/fuel-calculation.model";
import { ClipboardTextComponent } from "../../../../shared/components/clipboard-text/clipboard-text.component";

@Component({
    selector: 'app-fuel-calculation',
    imports: [CommonModule, MatCardModule, MatTooltipModule, MatIconModule, MatTooltipModule, ClipboardTextComponent],
    templateUrl: './fuel-calculation.component.html',
    styleUrl: './fuel-calculation.component.scss'
})
export class FuelCalculationComponent {
    constructor(private newFlightPerformanceService: NewFlightPerformanceService) {
    }
    
    protected get fuelCalculation$(): Observable<FuelCalculation> {
        return this.newFlightPerformanceService.newFlightPerformance$.pipe(
            map(x => x?.fuelCalculation ?? ({
                alternateFuel: 0,
                contingencyFuel: 0,
                tripFuel: 0,
                finalReserveFuel: 0,
                totalFuel: 0,
                totalEndurance: 0
            }))
        )
    }
    
    protected convertDecimalHoursToMinutes(decimalHours?: number): number {
        if (!decimalHours) return 0; 
        
        const hours = Math.floor(decimalHours);
        return Math.round((decimalHours - hours) * 60);
    }

    protected floorDecimalHours(decimalHours?: number): number {
        if (!decimalHours) return 0;
        return Math.floor(decimalHours);
    }

}
