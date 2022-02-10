import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AwardQuestion } from "./AwardQuestion.entity";

@Entity()
export class AwardQuestionOption extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => AwardQuestion, q => q.id)
    questionId: Array<AwardQuestion>
}