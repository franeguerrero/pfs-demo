import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): User[] {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): User {
        return this.userService.findById(parseInt(id));
    }

    @Post()
    create(@Body() user: User): User {
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): User {
        return this.userService.update(parseInt(id), user);
    }

    @Delete(':id')
    delete(@Param('id') id: string): User {
        return this.userService.delete(parseInt(id));
    }
}
