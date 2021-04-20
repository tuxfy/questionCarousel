export interface IAnswer {
	title: string
	selected: boolean
}

export interface IQuestion {
	title: string
	image: string
	options: Array<IAnswer>
}

export interface ICurrentQuestion extends IQuestion {
	index: number
}

export interface IQuestions extends Array<IQuestion> {}

export type Direction = `left` | `right` | null

export interface ICarouselContextState {
	questions: IQuestions
	currentQuestion: ICurrentQuestion
	fetchQuestions: () => void
	navigateQuestions: (direction: Direction) => void
	openQuestion: (index: number) => void
	selectAnswer: (index: number) => void
}


