import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerEntity } from "src/player/Player.entity";
import { PlayerPositionsEntity } from "src/playerpositions/PlayerPositions.entity";
import { PlayerPositionsService } from "src/playerpositions/PlayerPositions.service";
import { SeasonEntity } from "src/seasons/Season.entity";
import { SeasonService } from "src/seasons/Season.service";
import { PlayerController } from "./Player.controller";
import { PlayerService } from "./Player.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerEntity, SeasonEntity, PlayerPositionsEntity])
    ],
    controllers: [PlayerController],
    providers: [PlayerService, SeasonService, PlayerPositionsService],
    exports: [PlayerService]
})
export class PlayerModule {}