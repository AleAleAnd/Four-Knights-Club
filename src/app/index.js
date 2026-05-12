import { Hero } from '../widgets/hero/index.js'
import { Features } from '../widgets/features/index.js'
import { ParticipantsWidget } from '../widgets/index.js'
import { StepsWidget, initSteps } from '../widgets/steps/index.js'
import { initSlider } from '../shared/ui/slider/slider.js'
import { Footer } from '../widgets/footer/index.js'
import { ScrollProgress } from '../shared/ui/scroll-progress/scroll-progress.js'

const initApp = () => {
  const root = document.querySelector('#app')
  root.insertAdjacentHTML('afterbegin', ScrollProgress())
  if (!root) return

  root.innerHTML = `
    <main>
      ${ScrollProgress()}
      ${Hero()}
      ${Features()}
      ${StepsWidget()} 
      ${ParticipantsWidget()}
      ${Footer()}
    </main>
  `

  initSlider('participants-main-slider', {
    loop: true,
    itemsPerView: 3,
    autoplay: 4000,
  })

  initSteps()
}

initApp()
