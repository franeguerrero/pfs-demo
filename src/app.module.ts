import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DocController } from './doc/doc.controller';
import { DocService } from './doc/doc.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CalcController } from './calc/calc.controller';
import { CalcService } from './calc/calc.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  ],
  controllers: [AppController, DocController, UserController, CalcController],
  providers: [AppService, DocService, UserService, CalcService],
})
export class AppModule { }
