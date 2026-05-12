import { loadStyles } from '../../../shared/lib/loadStyles.js'
loadStyles(new URL('./scroll-progress.css', import.meta.url).href)

export const ScrollProgress = () => {
  return `<div class="scroll-line"><div class="scroll-progress"></div></div>`
}
