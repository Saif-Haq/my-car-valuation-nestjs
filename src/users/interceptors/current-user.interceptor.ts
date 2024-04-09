import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

// interface ClassConstructor {
//     new(...args: any[]): {}
//   }

//   //Decorator
//   export function Serialize(dto: ClassConstructor) {
//     return UseInterceptors(new SerializeInterceptor(dto));
//   }

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(private userService: UsersService) { }

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.CurrentUser = user;
    }

    return handler.handle();
  }
}