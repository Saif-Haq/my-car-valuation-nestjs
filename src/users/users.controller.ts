import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) //Excludes Password :)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    return user;
  }

  @Get('/who-am-i')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
    return { message: "Sign Out :(" }
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Get(':id')
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @UseInterceptorSerializeInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors-get')
  // getColor(@Session() session: any) {
  //   console.log(session);
  //   return session.color;
  // }

}
