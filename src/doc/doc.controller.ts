import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DocService } from './doc.service';
import { Doc } from './doc.model';
@Controller('doc')
export class DocController {
    constructor(private docService: DocService) { }

    @Get()
    public getDocs(): Doc[] {
        return this.docService.getDocs();
    }
    @Get('id/:id')
    public getDocById(@Param('id') id): Doc {
        return this.docService.getDocById(parseInt(id));
    }
    @Get('author/:author')
    public getDocByAuthor(@Param('author') author): Doc[] {
        let encodedAuthor = encodeURIComponent(author)
        return this.docService.getDocsByAuthor(encodedAuthor)
    }
    @Post()
    create(@Body() doc: Doc): string {
        return this.docService.addDoc(doc);
    }
}
