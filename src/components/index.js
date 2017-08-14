import Carousel from './carousel/index'
import CarouselItem from './carousel-item/index'

const components = [
  Carousel,
  CarouselItem
]

const MyComponents = {
  install(Vue, options) {
    components.map(component => {
      Vue.component(component.name, component)
    });
  }
}

export default MyComponents