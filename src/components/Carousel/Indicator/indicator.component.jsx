import React, { useContext } from 'react'
import './indicator.styles.scss'

import CarouselContext from '../carousel.context'

export default function Indicator() {
	const { questions, currentQuestion, openQuestion } = useContext(CarouselContext)

	const handleClickIndicator = e => {
		const selectedIndex = ~~e.target.dataset.index
		openQuestion(selectedIndex)
	}

	return (
		<>
			{questions.length && (
				<div className="indicatorContainer">
					{questions.map((q, i) => (
						<div
							key={i}
							data-index={i}
							className={`indicator ${i === currentQuestion.index ? `active` : ``}`}
							onClick={handleClickIndicator}
							onTouchMove={e => e.preventDefault()}
						></div>
					))}
				</div>
			)}
		</>
	)
}
