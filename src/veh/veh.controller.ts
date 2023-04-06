import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehService } from './veh.service';
import { Vehicle } from './veh.model';
@Controller('veh')
export class VehController {
    constructor(private vehService: VehService) { }

    @Get()
    public getAllVehicles(): Vehicle[] {
        return this.vehService.getAllVehicles();
    }
    @Get('cars')
    public getCars(): Vehicle[] {
        return this.vehService.getCars()
    }
    @Get('trucks')
    public getTrucks(): Vehicle[] {
        return this.vehService.getTrucks()
    }

    @Post()
    create(@Body() veh: Vehicle | Vehicle[]): void {
        if (Array.isArray(veh)) {
            this.vehService.addVehicles(veh);
        } else {
            this.vehService.addVehicle(veh);
        }
    }
}