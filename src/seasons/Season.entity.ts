import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, Unique } from "typeorm";

export enum SeasonEnum {
    WINTER = 1,
    SPRING,
    SUMMER,
    FALL
}

@Entity("season")
@Index(["year", "season"])
@Unique("YearAndSeason", ["year", "season"])
export class SeasonEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    year: number

    @Column({ type: "enum", enum: SeasonEnum })
    season: SeasonEnum
}