import React, { useContext } from 'react'
import './indicator.styles.scss'

import QuestionContext from '../../../context/question.context'

export default function Indicator() {
	let [context, setContext] = useContext(QuestionContext)
	let { questions, currentQuestion } = context

	// TODO: inital active set

	const navigate = el => {
		highlite(el.target)
		const index = ~~el.target.dataset.index
		const newContext = {
			...context,
			currentQuestion: { ...questions[index], index: index },
		}
		setContext(newContext)
	}

	const highlite = el => {
		document
			.querySelectorAll('.indicator')
			.forEach(indicator => indicator.classList.remove('active'))
		el.classList.add('active')
	}

	return (
		<div className="indicatorContainer">
			{questions.map((q, i) => (
				<div
					key={i}
					data-index={i}
					className={`indicator ${i === currentQuestion.index ? `active` : ``}`}
					onClick={navigate}
				></div>
			))}
		</div>
	)
}
