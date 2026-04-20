import { Link, useParams } from 'react-router-dom'

import { Article } from '../../../components'

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <Article keyId="app-page-post-detail">
      <h1>Post</h1>
      <p>
        This is a placeholder for post <span className="text-decorated">{id ?? '—'}</span>. Full
        articles will appear here once content is wired up.
      </p>
      <p>
        <Link to="/blog">← Back to blog</Link>
      </p>
    </Article>
  )
}
