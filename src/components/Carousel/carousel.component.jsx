import React, { useState } from 'react'

import './carousel.styles.scss'
import Form from './Form/form.component'
import Control from './Control/control.component'
import Indicator from './Indicator/indicator.component'

import questionData from '../../data/questions.json'
import QuestionContext from '../../context/question.context'

export default function Carousel() {
	questionData.currentQuestion = { ...questionData.questions[0], index: 0 }
	const [context, setContext] = useState(questionData)
	let { questions, currentQuestion } = context
	const [touchStart, setTouchStart] = useState(0)
	const [touchEnd, setTouchEnd] = useState(0)

	const handleTouchStart = e => {
		setTouchStart(e.targetTouches[0].clientX)
	}

	const handleTouchMove = e => {
		setTouchEnd(e.targetTouches[0].clientX)
	}

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 150) {
			navigate(`right`)
		}

		if (touchStart - touchEnd < -150) {
			navigate(`left`)
		}
	}

	const navigate = direction => {
		const count = context.questions.length
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
		<QuestionContext.Provider value={[context, setContext]}>
			<div
				className="questionCarousel"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div
					className="carouselHeader"
					style={{
						backgroundImage: `url(${window.location}/images/${context.currentQuestion.image})`,
					}}
				>
					<Control direction="left" navFunc={navigate} />
					<Control direction="right" navFunc={navigate} />
				</div>
				<div className="carouselContent">
					<Form />
					<Indicator />
				</div>
			</div>
		</QuestionContext.Provider>
	)
}
