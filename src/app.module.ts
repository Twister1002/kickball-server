import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PlayerEntity } from './player/Player.entity';
import { PlayerModule } from './player/Player.module';
import { PlayerPositionsEntity } from './playerpositions/PlayerPositions.entity';
import { PlayerPositionsModule } from './playerpositions/PlayerPositions.module';
import { SeasonEntity } from './seasons/Season.entity';
import { SeasonModule } from './seasons/Season.module';

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
                SeasonEntity,
                PlayerEntity,
                PlayerPositionsEntity
            ],
            synchronize: true,
            dropSchema: false,
            autoLoadEntities: true,
        }),
        SeasonModule,
        PlayerModule,
        PlayerPositionsModule
    ]
})
export class AppModule {
    constructor(private connection: Connection) { }
}
