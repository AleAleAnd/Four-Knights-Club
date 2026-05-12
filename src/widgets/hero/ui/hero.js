import { heroContent } from '../model/content.js'
import { Button } from '../../../shared/ui/button/button.js'
import { loadStyles } from '../../../shared/lib/loadStyles.js'
loadStyles(new URL('./hero.css', import.meta.url).href)

export const Hero = () => {
  return `
    <section id="hero" class="hero">
   
      <div class="hero__container">
      <a href="#" class="hero__logo-link">
       <img class="hero__logo" src="${heroContent.logo}" alt="logo" />
      </a>
        <div class="hero__info">
          <h1 class="hero__title">${heroContent.title}</h1>
          <p class="hero__description">${heroContent.description}</p>
          
          <div class="hero__actions">
            ${Button({ text: 'Поддержать шахматную мысль', mode: 'filled', link: '#features' })}
            ${Button({ text: 'Подробнее о турнире', mode: 'outlined', link: '#steps' })}
          </div>
        </div>

        <div class="hero__visual">
          <img class="hero__img-city" src="${heroContent.cityImage}" alt="" />
          <img class="hero__img-circle" src="${heroContent.circleImage}" alt="" />
          
          <div class="hero__pieces">  
            ${heroContent.pieces
              .map(
                (piece, i) => `
              <img class="hero__piece hero__piece--${i + 1}" src="${piece}" alt="chess piece" />
            `,
              )
              .join('')}
          </div>
        </div>
      </div>

      <div class="hero__ticker running-text">
        <div class="running-text__inner">
          <p class="running-text__content">
            ${heroContent.runningText.join(' • ')} • 
            ${heroContent.runningText.join(' • ')}
          </p>
        </div>
      </div>
    </section>
  `
}
