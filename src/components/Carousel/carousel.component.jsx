import React, { useContext, useEffect, useState } from 'react'

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

	let touchStart = undefined
	let touchEnd = undefined
	const handleTouchMove = e => {
		if (touchStart == null) touchStart = e.targetTouches[0].clientX
	}

	const handleTouchEnd = e => {
		if (!touchStart) return

		touchEnd = e.changedTouches[0].clientX
		const diff = touchStart - touchEnd

		if (diff < -150) {
			navigateQuestions(`left`)
		}
		else if (diff > 150) {
			navigateQuestions(`right`)
		}

		touchStart = undefined
		touchEnd = undefined
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
