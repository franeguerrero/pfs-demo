import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class DocService {
    private static readonly CANTIDAD_DOCS = 10;

    public getDocs(): any {
        const docs = readFileSync('assets/mock.json', 'utf8');
        return JSON.parse(docs);
    }
}
