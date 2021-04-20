import React, { MouseEvent, ChangeEvent, useContext } from 'react'
import './form.styles.scss'

import { IAnswer } from '../carousel.types'
import CarouselContext from '../carousel.context'

export default function Content() {
	const { currentQuestion, selectAnswer } = useContext(CarouselContext)

	const handleChangeAnswer = (e: ChangeEvent<HTMLElement> | MouseEvent<HTMLElement>) => {
		const selectedIndex: number = e.currentTarget?.dataset?.index
			? ~~e.currentTarget.dataset.index
			: 0
		selectAnswer(selectedIndex)
	}

	return (
		<>
			{currentQuestion.options && (
				<div className="formContainer">
					<h1>{currentQuestion.title}</h1>
					<form>
						{currentQuestion.options.map((answer: IAnswer, i: number) => (
							<div key={i}>
								<input
									type="radio"
									name="question"
									id={`${i}`}
									data-index={i}
									onChange={handleChangeAnswer}
									checked={answer.selected}
									required
								/>
								<label htmlFor={answer.title} data-index={i} onClick={handleChangeAnswer}>
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
