import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { PlayerPositionsDTO } from "src/playerpositions/PlayerPositions.dto";
import { PlayerEntity } from "./Player.entity";
import { PlayerService } from "./Player.service";

@Controller("player")
export class PlayerController {
    constructor(private playerService: PlayerService) {};

    @Get("/") 
    public getAllPlayers() {
        return this.playerService.getPlayers();
    }

    @Get(":id")
    public getPlayerById(
        @Param("id") id: number
    ): Promise<PlayerEntity> {
        return this.playerService.getPlayerById(id);
    }

    @Get(":name")
    public getPlayerByName(
        @Param("name") name: string
    ): Promise<PlayerEntity> {
        const [firstName, lastName] = name.split("+");
        return this.playerService.getPlayerByName(firstName, lastName);
    }

    @Put("create")
    public createPlayer(
        @Body("firstName") firstName: string, 
        @Body("lastName") lastName: string
    ): Promise<PlayerEntity> {
        return this.playerService.createNewPlayer(firstName, lastName);
    }

    @Put("season/add") 
    public AddPlayerToSeason(
        @Body("playerId") playerId: number,
        @Body("year") year: number,
        @Body("season") season: number
    ): Promise<PlayerEntity | string> {
        return this.playerService.addPlayerToSeason(playerId, year, season)
        .then((player) => player)
        .catch((err: Error) => err.message);
    }

    @Delete("season/remove") 
    public removePlayerFromSeason(
        @Body("playerId") playerId: number,
        @Body("year") year: number,
        @Body("season") season: number
    ): Promise<PlayerEntity | string> {
        return this.playerService.removePlayerFromSeason(playerId, year, season)
        .then((player) => player)
        .catch((err: Error) => err.message);
    }

    @Put("positions/add")
    public addPositionsToPlayer(
        @Body("playerId") playerId: number,
        @Body("year") year: number,
        @Body("season") season: number,
        @Body("positions") positions: PlayerPositionsDTO
    ): Promise<PlayerEntity | string> {
        return this.playerService.addPositionsToPlayer(playerId, year, season, positions)
        .then((player) => player)
        .catch((err: Error) => err.message);
    }

    @Put("positions/update")
    public updatePositionsToPlayer(
        @Body("playerId") playerId: number,
        @Body("year") year: number,
        @Body("season") season: number,
        @Body("positions") positions: PlayerPositionsDTO
    ): Promise<PlayerEntity | string> {
        return this.playerService.addPositionsToPlayer(playerId, year, season, positions)
        .then((player) => player)
        .catch((err: Error) => err.message);
    }

    @Delete("positions/remove")
    public removePositionsToPlayer(
        @Body("playerId") playerId: number,
        @Body("year") year: number,
        @Body("season") season: number
    ): Promise<PlayerEntity | string> {
        return this.playerService.removePositionsFromPlayer(playerId, year, season)
        .then((player) => player)
        .catch((err: Error) => err.message);
    }
}