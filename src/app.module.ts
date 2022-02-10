import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AwardModule } from './awards/Awards.module';
import { PlayerModule } from './player/Player.module';
import { QuestionModule } from './questions/Questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 33060,
      username: "root",
      password: "root",
      database: "kickball",
      entities: [
        "src/entities/*.entity{.ts,.js}",
      ],
      synchronize: true,
      dropSchema: true,
      autoLoadEntities: true,
    }),
    AwardModule,
    QuestionModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}  
}
