export class Doc {
    public id: number;
    public title: string;
    public author: string;
    public genre: string;
    public year: number;

    constructor(id: number, title: string, author: string, genre: string, year: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.year = year;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getYear(): number {
        return this.year;
    }
}
