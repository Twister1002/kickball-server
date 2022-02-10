import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AwardQuestion } from "src/entities/AwardQuestion.entity";
import { AwardQuestionOption } from "src/entities/AwardQuestionOption.entity";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(AwardQuestion) private awardQuestion: Repository<AwardQuestion>,
        @InjectRepository(AwardQuestionOption) private questionOptions: Repository<AwardQuestionOption>
    ) {}

    createQuestion(): Promise<void> {
        return;
    }
}