import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { AwardUser } from "src/entities/AwardUser.entity";
import { AwardsService } from "./Awards.service";

@Controller("awards")
export class AwardsController { 
    constructor(private awardService: AwardsService) {}

    @Get("user/:uuid")
    getUserData(@Param("uuid") uuid: string): Promise<AwardUser> {
        return this.awardService.getUserByUUID(uuid);
    }

    @Put("create")
    createUUIDs(@Body("amount") amount: number): Promise<number> {
        return this.awardService.createUsersForAwards(amount);
    }

    
}