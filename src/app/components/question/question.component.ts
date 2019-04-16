import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: any
  @Input() currQuest: number
  @Input() onNextQuest: any
  @Output() nextQuest = new EventEmitter<any>()

  answers: any
  selectedIdx: number
  correctAnsIdx: number
  answerStatus: string
  isAnswered: boolean

  constructor() { }

  initQuestion() {
    this.selectedIdx = -1
    this.correctAnsIdx = -1
    this.answerStatus = 'unselected'
    let answers = [...this.question.incorrect_answers]
    answers.push(this.question.correct_answer)
    answers.sort(() => Math.random() - 0.5);
    this.answers = answers
    this.isAnswered = false
  }

  ngOnInit() {
    this.initQuestion()
  }

  ngOnChanges() {
    this.initQuestion()
  }

  getClassByStatus(i) {
    let status = this.answerStatus

    // Checks if the user answered correctly and if he did not, it will mark the correct answer for him
    if (status !== 'correct') {
      if (this.correctAnsIdx === i) return 'correct'
    }

    if (i !== this.selectedIdx) return ''
    if (status === 'selected') return 'selected'
    else if (status === 'correct') return 'correct'
    else if (status === 'wrong') return 'wrong'
    else if (status === 'unselected') return ''
  }

  onSelectAnswer(i) {
    if (this.isAnswered) return
    this.selectedIdx = i
    this.answerStatus = "selected"
  }

  onAnswer() {
    if (this.isAnswered) return this.onContinue()
    if (this.answerStatus === "unselected") return
    let correctAsnwr = this.question.correct_answer
    let correctIdx = this.answers.findIndex(answer => answer === correctAsnwr)
    if (correctIdx === this.selectedIdx) this.answerStatus = "correct"
    else this.answerStatus = "wrong"
    this.correctAnsIdx = correctIdx
    this.isAnswered = true
  }

  onContinue() {
    if (this.answerStatus === 'correct') return this.nextQuest.emit(true)
    else this.nextQuest.emit(false)
  }

  buttonText() {
    if (!this.isAnswered) return 'OK'
    else return 'Continue'
  }

}
