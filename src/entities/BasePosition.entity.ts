import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BasePositionEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
}