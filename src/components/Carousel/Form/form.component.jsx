import React, { useContext } from 'react'
import './form.styles.scss'

import QuestionContext from '../../../context/question.context'

export default function Content() {
	const [context] = useContext(QuestionContext)
	const { currentQuestion } = context

	return (
		<div className="formContainer">
			<h1>{currentQuestion.title}</h1>
			<form>
				{currentQuestion.options.map((answer, i) => (
					<div key={i}>
						<input type="radio" name="question" id={i} required />
						<label htmlFor={answer}>{answer}</label>
					</div>
				))}
			</form>
		</div>
	)
}
