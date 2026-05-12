import { loadStyles } from '../../lib/loadStyles.js'
loadStyles(new URL('./slider.css', import.meta.url).href)

export const Slider = (items, renderItem, options = {}) => {
  const {
    id = `slider-${Math.random().toString(36).substr(2, 9)}`,
    loop = false,
    isMobileOnly = false,
    showCounter = false,
    showDots = true,
    breakpoints = null,
  } = options

  const slidesHtml = items
    .map((item) => `<div class="slider__slide">${renderItem(item)}</div>`)
    .join('')

  return `
    <div id="${id}" class="slider ${isMobileOnly ? 'slider--mobile-only' : ''}" 
         data-total="${items.length}"
         data-loop="${loop}"
         ${breakpoints ? `data-breakpoints="${breakpoints.join(',')}"` : ''}>
      
      <div class="slider__viewport">
        <div class="slider__track">${slidesHtml}</div>
      </div>

      <div class="slider__controls">
        <button class="slider__btn slider__btn--prev" aria-label="Назад"></button>
        <div class="slider__navigation">
          ${showCounter ? `<div class="slider__counter"><span class="slider__current">1</span> / <span class="slider__total">1</span></div>` : ''}
          ${showDots ? `<div class="slider__dots"></div>` : ''}
        </div>
        <button class="slider__btn slider__btn--next" aria-label="Вперед"></button>
      </div>
    </div>
  `
}

export const initSlider = (id, options = {}) => {
  const slider = document.getElementById(id)
  if (!slider) return

  const track = slider.querySelector('.slider__track')
  const nextBtn = slider.querySelector('.slider__btn--next')
  const prevBtn = slider.querySelector('.slider__btn--prev')
  const currentText = slider.querySelector('.slider__current')
  const totalText = slider.querySelector('.slider__total')
  const dotsContainer = slider.querySelector('.slider__dots')

  let currentIdx = 0
  let autoplayInterval = null
  const total = parseInt(slider.dataset.total)
  const loop =
    options.loop !== undefined ? options.loop : slider.dataset.loop === 'true'
  const autoplayDelay = options.autoplay || 0
  const gap = options.gap || 20

  const breakpointsAttr = slider.dataset.breakpoints
  const breakpoints = breakpointsAttr
    ? breakpointsAttr.split(',').map(Number)
    : null

  const getItemsPerView = () => {
    if (!breakpoints) return options.itemsPerView || 1
    const width = window.innerWidth
    if (width >= 1366) return breakpoints[2] || breakpoints[0]
    if (width >= 768) return breakpoints[1] || breakpoints[0]
    return breakpoints[0]
  }

  const renderDots = () => {
    if (!dotsContainer) return
    const itemsPerView = getItemsPerView()
    const dotsCount = Math.max(1, total - itemsPerView + 1)

    dotsContainer.innerHTML = Array.from({ length: dotsCount })
      .map(
        (_, i) =>
          `<span class="slider__dot ${i === currentIdx ? 'is-active' : ''}" data-index="${i}"></span>`,
      )
      .join('')

    dotsContainer.querySelectorAll('.slider__dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        currentIdx = parseInt(e.target.dataset.index)
        update()
        stopAutoplay()
        startAutoplay()
      })
    })
  }

  const update = () => {
    const isMobileOnly = slider.classList.contains('slider--mobile-only')
    const isDesktop = window.innerWidth >= 1024

    if (isMobileOnly && isDesktop) {
      track.style.transform = ''
      slider.style.removeProperty('--items')
      slider.style.removeProperty('--gap')
      stopAutoplay()
      return
    }

    const itemsPerView = getItemsPerView()
    const maxIdx = Math.max(0, total - itemsPerView)

    if (currentIdx > maxIdx) currentIdx = maxIdx
    if (currentIdx < 0) currentIdx = 0

    slider.style.setProperty('--items', itemsPerView)
    slider.style.setProperty('--gap', `${gap}px`)

    const firstSlide = track.querySelector('.slider__slide')
    if (firstSlide) {
      const slideWidth = firstSlide.getBoundingClientRect().width
      const moveDistance = currentIdx * (slideWidth + gap)
      track.style.transform = `translateX(-${moveDistance}px)`
    }

    if (currentText && totalText) {
      currentText.textContent = currentIdx + 1
      totalText.textContent = maxIdx + 1
    }

    if (loop) {
      if (prevBtn) prevBtn.disabled = false
      if (nextBtn) nextBtn.disabled = false
    } else {
      if (prevBtn) prevBtn.disabled = currentIdx === 0
      if (nextBtn) nextBtn.disabled = currentIdx >= maxIdx
    }

    slider
      .querySelectorAll('.slider__dot')
      .forEach((dot, i) => dot.classList.toggle('is-active', i === currentIdx))
  }

  const moveNext = () => {
    const itemsPerView = getItemsPerView()
    const maxIdx = total - itemsPerView
    if (currentIdx < maxIdx) {
      currentIdx++
    } else if (loop) {
      currentIdx = 0
    }
    update()
  }

  const movePrev = () => {
    const itemsPerView = getItemsPerView()
    const maxIdx = total - itemsPerView
    if (currentIdx > 0) {
      currentIdx--
    } else if (loop) {
      currentIdx = maxIdx
    }
    update()
  }

  const startAutoplay = () => {
    if (autoplayDelay > 0 && !autoplayInterval) {
      autoplayInterval = setInterval(moveNext, autoplayDelay)
    }
  }

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
      autoplayInterval = null
    }
  }

  nextBtn?.addEventListener('click', () => {
    moveNext()
    stopAutoplay()
    startAutoplay()
  })
  prevBtn?.addEventListener('click', () => {
    movePrev()
    stopAutoplay()
    startAutoplay()
  })

  window.addEventListener('resize', () => {
    renderDots()
    update()
  })

  slider.addEventListener('mouseenter', stopAutoplay)
  slider.addEventListener('mouseleave', startAutoplay)

  let startX = 0
  let isDragging = false

  const dragStart = (e) => {
    isDragging = true
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    stopAutoplay()
  }

  const dragEnd = (e) => {
    if (!isDragging) return
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX
    if (startX - endX > 50) moveNext()
    else if (endX - startX > 50) movePrev()
    isDragging = false
    startAutoplay()
  }

  slider.addEventListener('mousedown', dragStart)
  window.addEventListener('mouseup', dragEnd)
  slider.addEventListener('touchstart', dragStart, { passive: true })
  slider.addEventListener('touchend', dragEnd, { passive: true })

  renderDots()
  update()
  startAutoplay()
}
