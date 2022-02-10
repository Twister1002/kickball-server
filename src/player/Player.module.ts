import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "../entities/Player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    controllers: [],
    providers: []
})
export class PlayerModule {}