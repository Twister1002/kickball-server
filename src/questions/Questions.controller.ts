import { Controller, Put } from "@nestjs/common";
import { QuestionService } from "./Questions.service";

@Controller("question")
export class QuestionController { 
    constructor(private questionService: QuestionService) {}

    @Put("create")
    createQuestion(): Promise<void> {
        return;
    }
}