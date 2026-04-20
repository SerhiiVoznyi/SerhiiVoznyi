import './card.sass'

type Props = {
  title: string
  children?: React.ReactNode
}

const Card = ({ title, children }: Props) => {
  return (
    <section className="app-card">
      <h3 className="app-card__title text-decorated">{title}</h3>
      <p className="app-card__content">{children}</p>
    </section>
  )
}

export { Card }
