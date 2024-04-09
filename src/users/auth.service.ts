import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signUp(email: string, password: string) {
    const findUser = await this.usersService.find(email);
    if (findUser.length) {
      throw new BadRequestException("Email Already In Use");
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const dbPassword = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create({ email, password: dbPassword });

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password');
    }

    return user;
  }

} 