import React, { createContext, useState } from 'react'
import questionData from '../../data/questions.json'

const CarouselContext = createContext([])

export const CarouselContextProvider = ({ children }) => {
	const [questions, setQuestions] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState({})

	function fetchQuestions() {
		setQuestions(questionData.questions)
		if (!currentQuestion.index) {
			setCurrentQuestion({
				...questionData.questions[0],
				index: 0,
			})
		}
	}

	const navigateQuestions = direction => {
		const count = questions.length
		let index = currentQuestion.index

		if (direction === `left`) {
			index = index - 1 < 0 ? count - 1 : index - 1
		} else {
			index = index + 1 === count ? 0 : index + 1
		}
		openQuestion(index)
	}

	const openQuestion = index => {
		setCurrentQuestion({ ...questions[index], index: index })
	}

	const selectAnswer = index => {
		const options = currentQuestion.options.map(option => ({ ...option, selected: false }))
		options[index].selected = true

		const current = {
			...currentQuestion,
			index: currentQuestion.index,
			options,
		}
		setCurrentQuestion({
			...current,
		})

		const newQuestions = questions
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
