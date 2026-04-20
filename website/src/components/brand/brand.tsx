import { Link } from 'react-router-dom'

type BrandProps = {
  className?: string
  bold?: string
  size?: string
}

export const Brand = ({ bold, size, className }: BrandProps) => {
  const classes: string[] = ['app-brand']

  if (className != null) {
    classes.unshift(className)
  }

  if (bold != null) {
    classes.push(bold)
  }

  if (size != null) {
    classes.push(size)
  }

  return (
    <Link
      to="/"
      className={classes.join(' ')}>
      <i className="lar la-newspaper"></i>
      Serhii Voznyi
    </Link>
  )
}
