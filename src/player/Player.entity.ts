import { PlayerPositionsEntity } from "src/playerpositions/PlayerPositions.entity";
import { SeasonEntity } from "src/seasons/Season.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => PlayerPositionsEntity, pp => pp.player, { cascade: true })
    positions: Array<PlayerPositionsEntity>

    @ManyToMany(() => SeasonEntity, { cascade: true })
    @JoinTable()
    seasons: Array<SeasonEntity>
}