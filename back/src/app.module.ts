import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesModule } from './sites/sites.module';
import { FestivaliersModule } from './festivaliers/festivaliers.module';
import { LieuModule } from './lieu/lieu.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    
    TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true
  }),
  EventsModule,
  SitesModule,
  FestivaliersModule,
  LieuModule,
  UsersModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
