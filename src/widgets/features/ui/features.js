import { featuresContent } from '../model/content.js'
import { loadStyles } from '../../../shared/lib/loadStyles.js'

loadStyles(new URL('./features.css', import.meta.url).href)

export const Features = () => {
  const { lecture, session } = featuresContent

  return `
    <section id="features" class="features">
      <div class="features__container">
        
        <article class="features__item features__item--lecture">
          <div class="features__info">
              ${lecture.titles
                .map(
                  (title, key) =>
                    `<h2 class="features__title features__title--${key + 1}">${title}</h2>`,
                )
                .join('')}
            <img src="${lecture.image}" alt="Лекция" class="features__item--lecture-img">
          </div>
        </article>

        <article class="features__item features__item--session">
          <div class="features__media">
            <img src="${session.mainImage}" alt="Гроссмейстер" class="features__img-main">
            ${session.secondaryImages
              .map(
                (img, key) =>
                  `<img class="features__img features__img--${key + 1}" src="${img}" alt="Гроссмейстер">`,
              )
              .join('')}
          </div> <div class="features__session_info">
            <h2 class="features__title">
              ${session.title.replace('одновременной игры в шахматы на 160 досках', '<span class="features__title-accent">одновременной игры в шахматы на 160 досках</span>')}
            </h2>

            <table class="features__table table">
              <tbody class="table__body">
                ${session.table
                  .map(
                    (row) => `
                  <tr class="table__row">
                    <td class="table__label">${row.label}</td>
                    <td class="table__value">${row.oldprice ? `<del class="table__oldprice">${row.oldprice}</del>` : ''} ${row.value}</td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>

            <a href="#" class="features__contact">${session.contact}</a>
          </div>
        </article>

      </div>
    </section>
  `
}
