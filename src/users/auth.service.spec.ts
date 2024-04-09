import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (user: CreateUserDto) =>
        Promise.resolve({ id: 11, password: user.password, email: user.email } as User),
    }


    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService
        }]
    }).compile();

    service = module.get(AuthService);
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  })
})