import React, { TouchEvent, useContext, useEffect } from 'react'

import './carousel.styles.scss'

import Form from './Form/form.component'
import Indicator from './Indicator/indicator.component'
import Control from './Control/control.component'
import CarouselContext from './carousel.context'

export default function Carousel() {
	const { questions, currentQuestion, fetchQuestions, navigateQuestions } = useContext(
		CarouselContext
	)

	useEffect(() => {
		fetchQuestions()
	}, [!questions.length])

	let touchStart: number | null
	let touchEnd: number | null
	const handleTouchMove = (e: TouchEvent) => {
		if (!touchStart) touchStart = e.targetTouches[0].clientX
	}

	const handleTouchEnd = (e: TouchEvent) => {
		if (!touchStart) return

		touchEnd = e.changedTouches[0].clientX || 0
		const diff = touchStart - touchEnd

		if (diff < -150) {
			navigateQuestions(`left`)
		} else if (diff > 150) {
			navigateQuestions(`right`)
		}

		touchStart = null
		touchEnd = null
	}

	return (
		<div className="questionCarousel" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
			<div
				className="carouselHeader"
				style={{
					backgroundImage: `url(${window.location}/images/${currentQuestion.image})`,
				}}
			>
				<Control direction="left" />
				<Control direction="right" />
			</div>
			<div className="carouselContent">
				<Form />
				<Indicator />
			</div>
		</div>
	)
}
