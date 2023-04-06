export class Doc {
    private id: number;
    private title: string;
    private author: string;
    private genre: string;
    private year: number;

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

    public getAuthor(): string {
        return this.author;
    }
}
