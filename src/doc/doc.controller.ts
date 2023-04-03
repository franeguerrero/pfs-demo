import { Controller, Get } from '@nestjs/common';
import { DocService } from './doc.service';
@Controller('doc')
export class DocController {
    constructor(private docService: DocService) { }

    @Get()
    public getDocs(): string {
        return this.docService.getDocs();
    }
}
