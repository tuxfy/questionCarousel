import React, { useContext } from 'react'
import './form.styles.scss'

import CarouselContext from '../carousel.context'

export default function Content() {
	const { currentQuestion, selectAnswer } = useContext(CarouselContext)

	const handleClickAnswer = el => {
		const selectedIndex = el.target.dataset.index
		selectAnswer(selectedIndex)
	}

	return (
		<>
			{currentQuestion.options && (
				<div className="formContainer">
					<h1>{currentQuestion.title}</h1>
					<form>
						{currentQuestion.options.map((answer, i) => (
							<div key={i}>
								<input
									type="radio"
									name="question"
									id={i}
									data-index={i}
									onChange={handleClickAnswer}
									checked={answer.selected}
									required
								/>
								<label htmlFor={answer.title} data-index={i} onClick={handleClickAnswer}>
									{answer.title}
								</label>
							</div>
						))}
					</form>
				</div>
			)}
		</>
	)
}
