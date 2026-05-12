export const Button = ({ text, mode = 'filled', link }) => {
  const isLink = Boolean(link)
  const tag = isLink ? 'a' : 'button'

  const className = `button button--${mode}`
  const attributes = isLink ? `href="${link}"` : 'type="button"'

  return `
    <${tag} class="${className}" ${attributes}>
      ${text}
    </${tag}>
  `
}
