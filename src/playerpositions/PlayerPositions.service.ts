import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerEntity } from "src/player/Player.entity";
import { SeasonDTO } from "src/seasons/Season.dto";
import { SeasonEntity } from "src/seasons/Season.entity";
import { Repository } from "typeorm";
import { PlayerPositionsDTO } from "./PlayerPositions.dto";
import { PlayerPositionsEntity } from "./PlayerPositions.entity";

@Injectable()
export class PlayerPositionsService {
    constructor(
        @InjectRepository(PlayerPositionsEntity) private positionRepo: Repository<PlayerPositionsEntity>
    ) {}

    public async addPositionsToPlayer(
        playerId: number, 
        season: SeasonDTO,
        positions: PlayerPositionsDTO
    ): Promise<PlayerEntity> {
        // const player: PlayerEntity = await this.getPlayerById(playerId);
        // const seasonInfo: SeasonEntity | undefined = await this.seasonRepo.findOne({ year: season.year, season: season.seasonNum }) ?? undefined;

        // // Make sure the season actually exists first
        // if (!season) {
        //     throw Error(`Year ${season.year} and season ${SeasonEnum[season.seasonNum].toString()} does not exist`);
        // }
        // // Check if the player is not in the season
        // else if (!player.seasons.some(x => x.id === seasonInfo.id)) {
        //     throw Error(`Player does not exist in year ${season.year} and season ${SeasonEnum[season.seasonNum].toString()}`);
        // } 

        return null;
    }
}