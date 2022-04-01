import { Dependencies, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerEntity } from "./Player.entity";
import { SeasonEntity, SeasonEnum } from "src/seasons/Season.entity";
import { PlayerPositionsDTO } from "src/playerpositions/PlayerPositions.dto";
import { PlayerPositionsService } from "src/playerpositions/PlayerPositions.service";
import { PlayerPositionsEntity } from "src/playerpositions/PlayerPositions.entity";

@Injectable()
@Dependencies(PlayerPositionsService)
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity) private playerRepo: Repository<PlayerEntity>,
        @InjectRepository(SeasonEntity) private seasonRepo: Repository<SeasonEntity>,
        @InjectRepository(PlayerPositionsEntity) private positionRepo: Repository<PlayerPositionsEntity>
    ) { }

    public getPlayers(): Promise<Array<PlayerEntity>> {
        return this.playerRepo.find({ order: { id: "ASC" }, relations: ["seasons", "positions"] });
    }

    public getPlayerByName(firstName: string, lastName: string): Promise<PlayerEntity> {
        return this.playerRepo.findOne({ firstName, lastName }, { relations: ["seasons", "positions"] });
    }

    public getPlayerById(id: number): Promise<PlayerEntity> {
        return this.playerRepo.findOne(id, { relations: ["seasons", "positions"] });
    }

    public async createNewPlayer(firstName: string, lastName: string): Promise<PlayerEntity> {
        const player = new PlayerEntity();
        player.firstName = firstName;
        player.lastName = lastName;
        player.seasons = [];
        player.positions = [];

        return await player.save();
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
        const season: SeasonEntity | undefined = await this.seasonRepo.findOne({ year, season: seasonNum }) ?? undefined;

        // Make sure the season actually exists first
        if (!season) {
            throw Error(`Year ${year} and season ${SeasonEnum[seasonNum].toString()} does not exist`);
        }
        // Make sure the player isn't already in the season
        else if (player.seasons.find(x => x.id === season.id)) {
            throw Error(`Player exists in year ${year} and season ${SeasonEnum[seasonNum].toString()}`);
        } 
        // All Valid
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
        const season: SeasonEntity | undefined = await this.seasonRepo.findOne({ year, season: seasonNum }) ?? undefined;

        // Make sure the season actually exists first
        if (!season) {
            throw Error(`Year ${year} and season ${SeasonEnum[seasonNum].toString()} does not exist`);
        }
        // Check if the player is not in the season
        else if (!player.seasons.some(x => x.id === season.id)) {
            throw Error(`Player does not exist in year ${year} and season ${SeasonEnum[seasonNum].toString()}`);
        } 
        else {
            player.seasons = player.seasons.filter(x => x.id !== season.id);
            player.positions = player.positions.filter(x => x.seasonId !== season.id);
            player.save();

            return player;
        }
    }

    public async addPositionsToPlayer(playerId: number, year: number, seasonNum: number, positions: PlayerPositionsDTO): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.getPlayerById(playerId);
        const season: SeasonEntity | undefined = await this.seasonRepo.findOne({ year, season: seasonNum }) ?? undefined;

        // Player Exists?
        if (!player) {
            throw Error(`Player does not exist`);
        }
        // Season Exists?
        else if (!season) {
            throw Error(`Year ${year} and season ${SeasonEnum[seasonNum].toString()} does not exist`);
        }
        // Verify the player is in the season
        else if (!player.seasons.some(x => x.id === seasonNum)) {
            throw Error(`Player does not exist in year ${year} and season ${SeasonEnum[seasonNum].toString()}`);
        }
        // All good
        else {
            const seasonPositions: PlayerPositionsEntity = player.positions.find(x => x.seasonId === season.id) ?? new PlayerPositionsEntity();

            seasonPositions.seasonId = season.id;
            seasonPositions.firstBase = positions.firstBase;
            seasonPositions.secondBase = positions.secondBase;
            seasonPositions.thirdBase = positions.thirdBase;
            seasonPositions.shortStop = positions.shortStop;
            seasonPositions.catcher = positions.catcher;
            seasonPositions.pitcher = positions.pitcher;
            seasonPositions.outField = positions.outField;

            if (!seasonPositions?.id) {
                player.positions.push(seasonPositions);
            }
            
            return await player.save();
        }
    }

    public async removePositionsFromPlayer(playerId: number, year: number, seasonNum: number): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.getPlayerById(playerId);
        const season: SeasonEntity | undefined = await this.seasonRepo.findOne({ year, season: seasonNum }) ?? undefined;

        // Player Exists?
        if (!player) {
            throw Error(`Player does not exist`);
        }
        // Season Exists?
        else if (!season) {
            throw Error(`Year ${year} and season ${SeasonEnum[seasonNum].toString()} does not exist`);
        }
        // Verify the player is in the season
        else if (!player.seasons.some(x => x.id === seasonNum)) {
            throw Error(`Player does not exist in year ${year} and season ${SeasonEnum[seasonNum].toString()}`);
        }
        // All good
        else {
            return this.positionRepo.remove(player.positions.find(x => x.seasonId === season.id))
            .then(() => {
                player.positions = player.positions.filter(x => x.seasonId !== season.id)
                return player;
            })
            .catch((err: Error) => {
                throw err;
            });
        }
    }
}