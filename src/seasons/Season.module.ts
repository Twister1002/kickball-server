import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { SeasonController } from "./Season.controller";
import { SeasonEntity } from "./Season.entity";
import { SeasonService } from "./Season.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SeasonEntity
        ])
    ],
    controllers: [SeasonController],
    providers: [SeasonService],
})
export class SeasonModule { }
