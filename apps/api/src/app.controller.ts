import { Controller, Inject, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Controller()
export class AppController {
  //inject authservice
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  //Get request
  @Get()
  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    );
  }
}
