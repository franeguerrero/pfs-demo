export class Vehicle {
    private id: string;
    private brand: string;
    private model: string;
    private plate: string;
    private year: number;
    private price: number;
    private loadCapacity?: number;

    public constructor(id: string, brand: string, model: string, plate: string, year: number, price: number, loadCapacity?: number) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.plate = plate;
        this.year = year;
        this.price = price;
        this.loadCapacity = loadCapacity;
    }

    public getId() {
        return this.id
    }
    public getBrand() {
        return this.brand
    }
    public getModel() {
        return this.model
    }
    public getPlate() {
        return this.plate
    }
    public getYear() {
        return this.year
    }
    public getPrice() {
        return this.price
    }
    public getLoadCapacity() {
        return this.loadCapacity
    }
}

