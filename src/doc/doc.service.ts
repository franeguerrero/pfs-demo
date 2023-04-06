import { Injectable } from '@nestjs/common';
import { readFileSync, appendFileSync } from 'fs';
import { Doc } from './doc.model'

@Injectable()
export class DocService {
    private docList: Doc[] = [];
    constructor() {

        this.loadPistas();
    }
    private loadPistas(): void {
        let file = readFileSync('/home/franeguerrero/Prog/pfs-demo/src/doc/docs.csv', 'utf8');
        let data = file.split('\n').map(p => p.replace('\r', '')).map(p => p.split(';'));
        this.docList = [];
        for (let i = 0; i < data.length; i++) {
            let doc = new Doc(parseInt(data[i][0]), data[i][1], data[i][2], data[i][3], parseInt(data[i][4]));
            this.docList.push(doc);
        }
    }
    public getDocs(): Doc[] {
        return this.docList
    }
    public getDocById(id: number): Doc {
        let doc = null;
        for (let i = 0; i < this.docList.length; i++) {
            if (this.docList[i].getId() == id) {
                doc = this.docList[i];
            }
        }
        return doc;
    }
    public getDocsByAuthor(author: string): Doc[] {
        let decodedAuthor = decodeURIComponent(author)
        let docsByAuthor: Doc[] = [];
        for (let i = 0; i < this.docList.length; i++) {
            if (this.docList[i].getAuthor() == decodedAuthor) {
                docsByAuthor.push(this.docList[i]);
            }
        }
        return docsByAuthor;
    }
    public addDoc(newDoc: Doc): string {
        let doc = new Doc(
            newDoc.id,
            newDoc.title,
            newDoc.author,
            newDoc.genre,
            newDoc.year
        );


        if (
            doc.getId() !== undefined &&
            doc.getTitle() !== undefined &&
            doc.getAuthor() !== undefined &&
            doc.getGenre() !== undefined &&
            doc.getYear() !== undefined
        ) {
            this.docList.push(doc);
            appendFileSync(
                '/home/franeguerrero/Prog/pfs-demo/src/doc/docs.csv',
                `\n${doc.getId()};${doc.getTitle()};${doc.getAuthor()};${doc.getGenre()};${doc.getYear()}`
            );
            return "ok";
        } else {
            return `parametros incorrectos`;
        }
    }

}
