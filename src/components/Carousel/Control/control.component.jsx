import React, { useContext } from 'react'
import './control.styles.scss'
import CarouselContext from '../carousel.context'

export default function Control({ direction }) {
	const { navigateQuestions } = useContext(CarouselContext)

	const handleOnClick = el => {
		const direction = el.target.dataset.direction
		navigateQuestions(direction)
	}

	return (
		<div className="control" data-direction={direction} onClick={handleOnClick}>
			<div className={`arrow ${direction}`}></div>
			<div className={`arrow ${direction}`}></div>
		</div>
	)
}
