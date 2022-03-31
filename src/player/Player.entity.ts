import { SeasonEntity } from "src/seasons/Season.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("player")
@Index(["firstName", "lastName"])
export class PlayerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    lastUpdated: Date

    @ManyToMany(() => SeasonEntity, { cascade: true })
    @JoinTable()
    seasons: Array<SeasonEntity>
}