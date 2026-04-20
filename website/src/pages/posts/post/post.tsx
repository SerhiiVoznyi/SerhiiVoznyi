import './post.sass'

import { Link } from 'react-router-dom'

type Props = {
  id: string
  title: string
  url?: string
  comment?: string
  children?: React.ReactNode
}

const Post = ({ id, title, url, comment, children }: Props) => {
  return (
    <section
      id={id}
      className="post">
      <figure className="post-header">{url != null ? <img src={url}></img> : ''}</figure>
      <div className="post-body">
        <h2 className="post-body-title text-decorated">{title}</h2>
        <p className="post-body-comment">{comment}</p>
        <p className="post-body-content">{children}</p>
      </div>
      <div className="post-footer">
        <Link to={'/posts/' + id}>Read More →</Link>
      </div>
    </section>
  )
}

export { Post }
