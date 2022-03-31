import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { SeasonEntity } from "./Season.entity";
import { SeasonService } from "./Season.service";

@Controller("seasons")
export class SeasonController {
    constructor (private seasonService: SeasonService) {}

    @Get(":year/:season")
    public getSeason(
        @Param("season") season: number,
        @Param("year") year: number
    ) {
        return this.seasonService.getSeason(year, season);
    }

    @Get(":year")
    public getSeasonsInYear(@Param("year") year: number) {
        return this.seasonService.getSeasonsInYear(year);
    }

    @Get("/")
    public index(): Promise<Array<SeasonEntity>> {
        return this.seasonService.getAllSeasons();
    }

    @Put("create")
    public createSeason(
        @Body("year") year: number,
        @Body("season") season: number,
    ): Promise<string> {
        return this.seasonService.createNewSeason(year, season)
        .then((resp) => { return resp })
        .catch((err) => { return err });
    }
}