import { Slider, initSlider } from '../../../shared/ui/slider/slider.js'
import { stepsData } from '../model/content.js'
import { loadStyles } from '../../../shared/lib/loadStyles.js'
loadStyles(new URL('./steps.css', import.meta.url).href)

const renderStepCard = (stepText) => `
  <div class="step-card">
    <div class="step-card__header">
      <span class="step-card__number"></span>
    </div>
    <p class="step-card__text">${stepText}</p>
  </div>
`

export const StepsWidget = () => {
  const sliderId = 'steps-mobile-slider'

  return `
    <section id="steps" class="steps">
      <div class="container">
        <div class="steps__header">
          <h2 class="steps__title">
            <span class="steps__main">${stepsData.title}</span>
            <span class="steps__subtitle">${stepsData.text}</span>
          </h2>
          <img src="${stepsData.image}" alt="Самолет" class="steps__airplane">
        </div>

        <div class="steps__slider-container">
          ${Slider(stepsData.steps, renderStepCard, {
            id: sliderId,
            isMobileOnly: true,
            showCounter: false,
            showDots: true,
            loop: false,
            breakpoints: [1, 2],
          })}
        </div>
      </div>
    </section>
  `
}

export const initSteps = () => {
  initSlider('steps-mobile-slider')
}
