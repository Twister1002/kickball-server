import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerEntity } from "./Player.entity";
import { SeasonEntity, SeasonEnum } from "../seasons/Season.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity) private playerRepo: Repository<PlayerEntity>,
        @InjectRepository(SeasonEntity) private seasonRepo: Repository<SeasonEntity>
    ) {}

    public getPlayers(): Promise<Array<PlayerEntity>> {
        return this.playerRepo.find({ order: { id: "ASC" }, relations: ["seasons"] });
    }

    public getPlayerByName(firstName: string, lastName: string): Promise<PlayerEntity> {
        return this.playerRepo.findOne({ firstName, lastName }, { relations: ["seasons"] });
    }

    public getPlayerById(id: number): Promise<PlayerEntity> {
        return this.playerRepo.findOne(id, { relations: ["seasons"] });
    }

    public async createNewPlayer(firstName: string, lastName: string): Promise<PlayerEntity> {
        const newPlayer = await this.playerRepo.save({
            firstName,
            lastName
        })

        return newPlayer;
    }

    public async updatePlayer(id: number, newData: { firstName: string, lastName: string}): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.getPlayerById(id);

        player.firstName = newData.firstName;
        player.lastName = newData.lastName;

        const isSaved: PlayerEntity = await player.save();

        return isSaved;
    }

    public async addPlayerToSeason(playerId: number, year: number, seasonNum: number): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.getPlayerById(playerId);
        const season: SeasonEntity = await this.seasonRepo.findOne({ year, season: seasonNum });

        // Make sure the player isn't already in the season
        if (player.seasons.find(x => x.id === season.id)) {
            throw Error(`Player exists in year ${year} and season ${SeasonEnum[seasonNum].toString()}`);
        }
        else if (!season) {
            throw Error(`Year ${year} and season ${SeasonEnum[seasonNum].toString()} does not exist`);
        }
        else {
            if (!player.seasons) {
                player.seasons = [];
            }

            player.seasons.push(season);
            
            return player.save();
        }
    }

    public async removePlayerFromSeason(playerId: number, year: number, seasonNum: number): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.getPlayerById(playerId);

        player.seasons = player.seasons.filter(x => x.season !== seasonNum && x.year !== year);

        return player;
    }
}