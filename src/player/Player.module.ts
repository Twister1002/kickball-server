import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerEntity } from "src/player/Player.entity";
import { SeasonEntity } from "src/seasons/Season.entity";
import { SeasonService } from "src/seasons/Season.service";
import { PlayerController } from "./Player.controller";
import { PlayerService } from "./Player.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerEntity, SeasonEntity])
    ],
    controllers: [PlayerController],
    providers: [PlayerService, SeasonService]
})
export class PlayerModule {}