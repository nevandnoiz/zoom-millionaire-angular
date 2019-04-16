import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  questions: any[]
  currQuest: number=0
  isGameOn: boolean = false
  correctAnsCount: number = 0

  constructor(private questionService: QuestionService) { }

  async ngOnInit() {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions.results
    })
  }

  getLength() {
    return this.questions.map((q, i) => i + 1)
  }

  nextQuest(isCorrect) {
    this.correctAnsCount += isCorrect ? 1 : 0
    if (this.currQuest + 1 >= this.questions.length) return this.isGameOn = false
    this.currQuest++
  }

  playButtonText() {
    if (this.currQuest <= 0) return 'Play'
    else return 'Play Again'
  }

  playSectionText() {
    if (this.currQuest <= 0) return 'Who Wants To Be A Millionaire'
    else return `Your score: ${this.correctAnsCount}/${this.questions.length}`
  }

  onPlay() {
    this.isGameOn = true
    this.correctAnsCount = 0
    this.currQuest = 0
  }

}