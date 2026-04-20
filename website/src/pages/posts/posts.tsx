import './posts.sass'

import { Link } from 'react-router-dom'

const Posts = () => {
  return (
    <article className="app-page-posts">
      <div className="results">
        <section className="post">
          <div className="post-body">
            <h2 className="post-body-title text-decorated">No posts yet</h2>
            <p className="post-body-comment text-italic">—</p>
            <p className="post-body-content">
              The blog index is ready. When you add real posts (from markdown, a CMS, or an API),
              they will be listed here.
            </p>
          </div>
          <div className="post-footer">
            <Link to="/">Home</Link>
          </div>
        </section>
      </div>
    </article>
  )
}

export { Posts }
