import './App.css'
import Carousel from '../Carousel/carousel.component'
import { CarouselContextProvider } from '../Carousel/carousel.context'


function App() {
	return (
		<div className="App">
			<CarouselContextProvider>
				<Carousel />
			</CarouselContextProvider>
		</div>
	)
}

export default App
