import React, { useContext } from 'react'
import './control.styles.scss'

import QuestionContext from '../../../context/question.context'

export default function Control({ direction }) {
	let [context, setContext] = useContext(QuestionContext)
	let { questions, currentQuestion } = context

	const navigate = el => {
		const count = context.questions.length
		const direction = el.target.dataset.direction
		let index = currentQuestion.index

		if (direction === `left`) {
			index = index - 1 < 0 ? count - 1 : index - 1
		} else {
			index = index + 1 === count ? 0 : index + 1
		}
		
		const newContext = {
			...context,
			currentQuestion: { ...questions[index], index: index },
		}
		setContext(newContext)
	}

	return (
		<div className="control" data-direction={direction} onClick={navigate}>
			<div className={`arrow ${direction}`}></div>
			<div className={`arrow ${direction}`}></div>
		</div>
	)
}
