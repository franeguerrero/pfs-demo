import { Injectable } from '@nestjs/common';
import { Vehicle } from './veh.model'

const VEHICLES_URL = 'https://642eead68ca0fe3352dc2d15.mockapi.io/vehicles';

@Injectable()
export class VehService {
    private vehicles: Vehicle[] = [];

    constructor() {
        this.loadVehicles();
    }

    async loadVehicles() {
        const response = await fetch(VEHICLES_URL);
        const data = await response.json();
        this.vehicles = data.map((vehicleData) => {
            const { id, brand, model, plate, year, price, loadCapacity } = vehicleData;
            return new Vehicle(id, brand, model, plate, year, price, loadCapacity);
        });
    }

    getAllVehicles(): Vehicle[] {
        return this.vehicles;
    }

    getCars(): Vehicle[] {
        return this.vehicles.filter((vehicle) => !vehicle.getLoadCapacity());
    }

    getTrucks(): Vehicle[] {
        return this.vehicles.filter((vehicle) => vehicle.getLoadCapacity());
    }

    addVehicle(vehicle: Vehicle): Promise<void> {
        return fetch(VEHICLES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicle)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding vehicle');
                }
                this.vehicles.push(vehicle);
            })
            .catch(error => {
                console.error(error);
            });
    }

    async addVehicles(vehicles: Vehicle[]): Promise<void> {
        const promises = vehicles.map(vehicle =>
            fetch(VEHICLES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicle),
            })
        );
        await Promise.all(promises);
    }

}