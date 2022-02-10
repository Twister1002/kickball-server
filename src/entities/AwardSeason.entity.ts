import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Index, Unique } from "typeorm";
import { AwardQuestion } from "./AwardQuestion.entity";

export enum Season {
    WINTER,
    SPRING,
    SUMMER,
    FALL
}

@Entity()
@Index(["year", "season"])
export class AwardSeason extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    year: number

    @Column({ type: "enum", enum: Season })
    season: Season

    @Column("boolean")
    isLocked: boolean

    @OneToMany(() => AwardQuestion, aq => aq.id)
    questions: Array<AwardQuestion>
}