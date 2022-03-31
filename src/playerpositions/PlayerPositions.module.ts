import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerEntity } from "src/player/Player.entity";
import { PlayerPositionsService } from "src/playerpositions/PlayerPositions.service";
import { SeasonEntity } from "src/seasons/Season.entity";
import { PlayerPositionsEntity } from "./PlayerPositions.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerEntity, PlayerPositionsEntity, SeasonEntity]),
    ],
    controllers: [],
    providers: [PlayerPositionsService],
    exports: [PlayerPositionsService]
})
export class PlayerPositionsModule {}