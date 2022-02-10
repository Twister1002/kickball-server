import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwardQuestion } from "src/entities/AwardQuestion.entity";
import { AwardQuestionOption } from "src/entities/AwardQuestionOption.entity";
import { QuestionController } from "./Questions.controller";
import { QuestionService } from "./Questions.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AwardQuestion, 
            AwardQuestionOption
        ])
    ],
    controllers: [QuestionController],
    providers: [QuestionService]
})
export class QuestionModule { }