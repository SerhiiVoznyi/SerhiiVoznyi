import './Section.sass'

type ArticleSectionProps = {
  id?: string
  title?: string
  flex?: boolean
  children?: React.ReactNode
}

export const Section = ({ id, title, flex, children }: ArticleSectionProps) => {
  const classes = ['section']
  if (flex) {
    classes.push('section-flex')
  }
  return (
    <section
      id={id}
      className={classes.join(' ')}>
      {title != null ? <h2>{title}</h2> : ''}
      {children}
    </section>
  )
}
