import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SeasonEntity, SeasonEnum } from "./Season.entity";

@Injectable()
export class SeasonService {
    constructor(
        @InjectRepository(SeasonEntity) private awardServiceRepo: Repository<SeasonEntity>
    ) {}

    public getAllSeasons(): Promise<Array<SeasonEntity>> {
        return this.awardServiceRepo.find({ order: { id: "ASC" } })
    }

    public getSeasonsInYear(year: number): Promise<Array<SeasonEntity>> {
        return this.awardServiceRepo.find({ year });
    }

    public getSeason(year: number, season: number): Promise<SeasonEntity> {
        return this.awardServiceRepo.findOne({ year, season });
    }

    public async createNewSeason(year: number, season: number): Promise<string> {
        // Verify the season exists first
        const foundSeasons = await this.awardServiceRepo.findOne({ year, season });

        if (foundSeasons) {
            return (`Season already exists with ${year} - ${season}`); 
        }
        else if (!SeasonEnum[season]) {
            return (`Season does not exist ${season}`)
        }
        else {
            const isSaved = await this.awardServiceRepo.save({
                year,
                season
            });

            if (isSaved) {
                return "Season was created";
            }
            else {
                return `An error happened while creating the season.`
            }
        }
    }
}