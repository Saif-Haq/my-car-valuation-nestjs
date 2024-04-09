import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassConstructor {
  new(...args: any[]): {}
}

//Decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any) { }

  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
    // Before Request Handler - Incoming
    // console.log("Before Handler", context);

    return handler.handle().pipe(
      map((data: any) => {
        //Run Something Before the response is sent out
        // console.log("I'm running before response is sent out :)", data);

        return plainToClass(this.dto, data, { excludeExtraneousValues: true })
      })
    )
  }
}