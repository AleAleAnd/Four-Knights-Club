import { Slider } from '../../../shared/ui/slider/slider.js'
import { renderParticipantCard } from './ParticipantCard.js'
import { participantsData } from '../model/content.js'
import { loadStyles } from '../../../shared/lib/loadStyles.js'
loadStyles(new URL('./participants.css', import.meta.url).href)

export const ParticipantsWidget = () => {
  const sliderId = 'participants-main-slider'

  const sliderHtml = Slider(participantsData, renderParticipantCard, {
    id: sliderId,
    loop: true,
    showCounter: true,
    showDots: false,
    breakpoints: [1, 2, 3],
    autoplay: 4000,
  })

  return `
    <section id="participants" class="participants">
      <h2 class="participants__title">Участники турнира</h2>
      ${sliderHtml}
    </section>
  `
}
