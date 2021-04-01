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

	return (
		<QuestionContext.Provider value={[context, setContext]}>
			<div
				className="carouselHeader"
				style={{
					backgroundImage: `url(${window.location}/images/${context.currentQuestion.image})`,
				}}
			>
				<Control direction="left" />
				<Control direction="right" />
			</div>
			<div className="carouselContent">
				<Form />
				<Indicator />
			</div>
		</QuestionContext.Provider>
	)
}
