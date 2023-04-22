import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config/dist';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // await app.listen(3000);
  const configService = app.get(ConfigService);

  //get all variables from config service(env variables)
  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`], //here is url to access to interfaces of db, rabbitmq,...
      noAck: false, //automatic message acknowledgements, if set false we need to manually acknowledge
      queue: QUEUE,
      queueOptions: {
        durable: true, //the queue will survive a broker restart.
      },
    },
  });

  //start all microservices
  app.startAllMicroservices();
}
bootstrap();
