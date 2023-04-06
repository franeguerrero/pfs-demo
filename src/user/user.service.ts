import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import * as users from './user.json';

@Injectable()
export class UserService {
    private readonly users: User[] = users;

    findAll(): User[] {
        return this.users;
    }

    findById(id: number): User {
        return this.users.find(user => user.id === id);
    }

    create(user: User): User {
        const nextId = this.users.length + 1;
        const newUser = { id: nextId, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, user: User): User {
        const index = this.users.findIndex(u => u.id === id);
        if (index < 0) {
            return null;
        }
        const updatedUser = { id, ...user };
        this.users[index] = updatedUser;
        return updatedUser;
    }

    delete(id: number): User {
        const index = this.users.findIndex(user => user.id === id);
        if (index < 0) {
            return null;
        }
        return this.users.splice(index, 1)[0];
    }
}
