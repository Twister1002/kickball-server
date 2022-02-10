import { BaseEntity, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@Index(["firstName", "lastName"])
export class Player extends BaseEntity {
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
}