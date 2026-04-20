import './Article.sass'

export type ArticleProps = {
  keyId?: string
  className?: string
  children?: React.ReactNode
}

export const Article = ({ keyId, className, children }: ArticleProps) => {
  const classes = ['article']
  if (className != null) {
    classes.push(className)
  }
  return (
    <article
      id={keyId}
      key={keyId}
      className={classes.join(' ')}>
      {children}
    </article>
  )
}
