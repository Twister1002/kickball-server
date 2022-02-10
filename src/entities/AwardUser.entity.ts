import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm";
import { AwardVote } from "./AwardVote.entity";

@Entity()
@Unique("uuid", ["id"])
export class AwardUser extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string
    
    @Column()
    email: string

    @Column({ type: "boolean", default: 0 })
    finalized: boolean

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    lastUpdated: Date

    @OneToMany(() => AwardVote, av => av.id)
    votes: Array<AwardVote>
}