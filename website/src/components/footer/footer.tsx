import './footer.sass'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer-level">
        <section className="app-footer-section">
          <h3 className="app-footer-section-title">
            This site <i className="lar la-newspaper text-decorated"></i>
          </h3>
          <p className="text-italic text-bold">
            A personal blog — essays, technical notes, and work in progress.
          </p>
          <p>
            No ads here. Content and privacy practices may evolve as the site grows.
          </p>
          <Link to="/about">About</Link>
        </section>

        <section className="app-footer-section">
          <h3 className="app-footer-section-title">
            Built with <span className="text-decorated">care</span>
          </h3>
          <p className="text-italic">
            Hand-crafted UI; posts and tooling will expand over time.
          </p>
        </section>

        <section className="app-footer-section">
          <h3 className="app-footer-section-title">
            Connect <i className="las la-envelope text-decorated"></i>
          </h3>
          <p className="text-italic">
            Contact links can go here when you are ready to share them publicly.
          </p>
        </section>
      </div>
      <div className="app-footer-level">
        {new Date().getFullYear()} Serhii Voznyi
      </div>
    </footer>
  )
}

export { Footer }
