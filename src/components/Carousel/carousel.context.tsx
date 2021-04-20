import { createContext, FC, useState } from 'react'
import questionData from '../../data/questions.json'

import {
	ICarouselContextState,
	IQuestions,
	ICurrentQuestion,
	IAnswer,
	Direction,
} from './carousel.types'

const contextDefaultValues: ICarouselContextState = {
	questions: [],
	currentQuestion: {
		index: 0,
		title: ``,
		image: ``,
		options: [],
	},
	fetchQuestions: () => {},
	navigateQuestions: () => {},
	openQuestion: () => {},
	selectAnswer: () => {},
}

const CarouselContext = createContext<ICarouselContextState>(contextDefaultValues)

export const CarouselContextProvider: FC = ({ children }) => {
	const [questions, setQuestions] = useState<IQuestions>(contextDefaultValues.questions)
	const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>(
		contextDefaultValues.currentQuestion
	)

	function fetchQuestions() {
		setQuestions(questionData.questions)
		if (currentQuestion && !currentQuestion.index) {
			setCurrentQuestion({
				...questionData.questions[0],
				index: 0,
			})
		}
	}

	const navigateQuestions = (direction: Direction) => {
		const count: number = questions ? questions.length : 0
		let index = currentQuestion ? currentQuestion.index : 0

		if (direction === `left`) {
			index = index - 1 < 0 ? count - 1 : index - 1
		} else {
			index = index + 1 === count ? 0 : index + 1
		}
		openQuestion(index)
	}

	const openQuestion = (index: number) => {
		setCurrentQuestion({ ...questions[index], index: index })
	}

	const selectAnswer = (index: number) => {
		const options: Array<IAnswer> = currentQuestion.options.map(option => ({
			...option,
			selected: false,
		}))
		options[index].selected = true

		const current: ICurrentQuestion = {
			...currentQuestion,
			index: currentQuestion.index,
			options,
		}
		setCurrentQuestion({
			...current,
		})

		const newQuestions: IQuestions = questions
		newQuestions[currentQuestion.index] = current
		setQuestions({
			...newQuestions,
		})
	}

	return (
		<CarouselContext.Provider
			value={{
				questions,
				currentQuestion,
				fetchQuestions,
				navigateQuestions,
				openQuestion,
				selectAnswer,
			}}
		>
			{children}
		</CarouselContext.Provider>
	)
}

export default CarouselContext
