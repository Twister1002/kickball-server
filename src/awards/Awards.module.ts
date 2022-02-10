import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwardUser } from "src/entities/AwardUser.entity";
import { AwardsController } from "./Awards.controller";
import { AwardsService } from "./Awards.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AwardUser
        ])
    ],
    controllers: [AwardsController],
    providers: [AwardsService],
})
export class AwardModule { }