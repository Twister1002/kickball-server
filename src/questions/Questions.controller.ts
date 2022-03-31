import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { QuestionService } from "./Questions.service";

@Controller("question")
export class QuestionController { 
    constructor(private questionService: QuestionService) {}

    @Get(":year/:season")
    getAllQuestionsInSeason(
        @Param("year") year: number,
        @Param("season") season: number
    ) {

    }

    @Put("create")
    createQuestion(
        @Body("question") question: string
    ): Promise<void> {
        return;
    }
}