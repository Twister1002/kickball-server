import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, Unique, Index, JoinColumn } from "typeorm";
import { AwardSeason } from "./AwardSeason.entity";
import { AwardQuestion } from "./AwardQuestion.entity";
import { AwardQuestionOption } from "./AwardQuestionOption.entity";
import { AwardUser } from "./AwardUser.entity";

@Entity()
@Index(["awardUser", "awardSeason"])
@Index(["awardSeason", "question", "option"])
@Unique("vote", ["awardUser", "awardSeason", "question", "option"])
export class AwardVote extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => AwardUser, au => au.id)
    awardUser: AwardUser

    @JoinColumn()
    @OneToOne(() => AwardSeason, a => a.id)
    awardSeason: AwardSeason
    
    @JoinColumn()
    @OneToOne(() => AwardQuestion, aq => aq.id)
    question: AwardQuestion

    @JoinColumn()
    @OneToOne(() => AwardQuestionOption, aqo => aqo.id)
    option: AwardQuestionOption
}