import { footerData } from '../model/content.js'
import { loadStyles } from '../../../shared/lib/loadStyles.js'
loadStyles(new URL('./footer.css', import.meta.url).href)

export const Footer = () => {
  return `
    <footer class="footer">
      <div class="footer__ticker running-text">
          <div class="running-text__inner">
                <p class="running-text__content">
                  ${footerData.runningText.join(' • ')} • 
                  ${footerData.runningText.join(' • ')}
                </p>
          </div>
      </div>
      <div class="footer__content">
        <p class="footer__text">${footerData.text}</p>
      </div>
    </footer>
  `
}
