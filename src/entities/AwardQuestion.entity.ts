import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, ManyToOne } from "typeorm";
import { AwardSeason } from "./AwardSeason.entity";
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

    @ManyToOne(() => AwardSeason, a => a.questions)
    award: AwardSeason
}