import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AwardUser } from "src/entities/AwardUser.entity";
import { Repository } from "typeorm";

@Injectable()
export class AwardsService {
    constructor(
        @InjectRepository(AwardUser) private awardUsers: Repository<AwardUser>
    ) {}

    getUserByUUID(uuid: string): Promise<AwardUser> {
        return this.awardUsers.findOne(uuid);
    }

    getAllUsers(): Promise<Array<AwardUser>> {
        return this.awardUsers.find({order: { firstName: "ASC"}});
    }

    async createUsersForAwards(amount: number): Promise<number> {
        let createdUsers: number = 0;

        for (let i = 0; i < amount; i++) {
            await this.awardUsers.save({
                email: `testing-${i}@test.com`,
                firstName: `firstName ${i}`,
                lastName: `lastName ${i}`
            })

            createdUsers++;
        }

        return createdUsers;
    }
}