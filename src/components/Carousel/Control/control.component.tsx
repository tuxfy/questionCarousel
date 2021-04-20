import React, { MouseEvent, useContext } from 'react'
import './control.styles.scss'

import { Direction } from '../carousel.types'
import CarouselContext from '../carousel.context'

interface ControlProps {
	direction: Direction
}

export default function Control({ direction }: ControlProps) {
	const { navigateQuestions } = useContext(CarouselContext)

	const handleOnClick = () => {
		navigateQuestions(direction)
	}

	return (
		<div className="control" data-direction={direction} onClick={handleOnClick}>
			<div className={`arrow ${direction}`}></div>
			<div className={`arrow ${direction}`}></div>
		</div>
	)
}
