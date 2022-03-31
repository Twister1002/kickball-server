import { SeasonEntity } from "../seasons/Season.entity";
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PlayerEntity } from "src/player/Player.entity";

@Entity("player_positions")
export class PlayerPositionsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => PlayerEntity, p => p.positions)
    player: PlayerEntity

    @ManyToOne(() => SeasonEntity, s => s.id)
    season: SeasonEntity

    @Column()
    playerId: number

    @Column()
    seasonId: number

    @Column({ default: false })
    firstBase: boolean

    @Column({ default: false })
    secondBase: boolean

    @Column({ default: false })
    thirdBase: boolean

    @Column({ default: false })
    shortStop: boolean

    @Column({ default: false })
    outField: boolean

    @Column({ default: false })
    pitcher: boolean

    @Column({ default: false })
    catcher: boolean
}