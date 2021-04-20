import { MouseEvent, TouchEvent, useContext } from 'react'
import './indicator.styles.scss'

import { IQuestion } from '../carousel.types'
import CarouselContext from '../carousel.context'

export default function Indicator() {
	const { questions, currentQuestion, openQuestion } = useContext(CarouselContext)

	const handleClickIndicator = (e: MouseEvent<HTMLElement>) => {
		const selectedIndex: number = e.currentTarget?.dataset?.index
			? ~~e.currentTarget.dataset.index
			: 0
		openQuestion(selectedIndex)
	}

	return (
		<>
			{questions.length && (
				<div className="indicatorContainer">
					{questions.map((q: IQuestion, i: number) => (
						<div
							key={i}
							data-index={i}
							className={`indicator ${i === currentQuestion.index ? `active` : ``}`}
							onClick={handleClickIndicator}
							onTouchMove={(e: TouchEvent<HTMLDivElement>) => e.preventDefault()}
						></div>
					))}
				</div>
			)}
		</>
	)
}
