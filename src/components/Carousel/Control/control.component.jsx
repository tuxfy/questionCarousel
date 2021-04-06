import './control.styles.scss'

export default function Control({ direction, navFunc }) {
	const handleOnClick = el => {
		const direction = el.target.dataset.direction
		navFunc(direction)
	}

	return (
		<div className="control" data-direction={direction} onClick={handleOnClick}>
			<div className={`arrow ${direction}`}></div>
			<div className={`arrow ${direction}`}></div>
		</div>
	)
}
