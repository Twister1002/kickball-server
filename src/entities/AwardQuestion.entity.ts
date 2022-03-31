import { SeasonEntity } from "src/seasons/Season.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

import { AwardQuestionOption } from "./AwardQuestionOption.entity";

@Entity()
export class AwardQuestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column("longtext")
    question: string

    @Column("longtext")
    description: string

    @OneToMany(() => AwardQuestionOption, o => o.id)
    options: Array<AwardQuestionOption>

    // @ManyToOne(() => SeasonEntity, a => a.questions)
    // award: SeasonEntity
}