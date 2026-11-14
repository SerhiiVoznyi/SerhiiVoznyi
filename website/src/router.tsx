import { type Location, Navigate, Route, Routes } from 'react-router-dom'

import {
  ArticlePage,
  ContactPage,
  ExperiencePage,
  JournalPage,
  MapPage,
  ProfilePage,
  SignalLostPage,
} from './pages'

const REDIRECTS: Record<string, string> = {
  '/home': '/',
  '/identity': '/profile',
  '/dossier': '/experience',
  '/uplink': '/contact',
}

export const AppRouter = ({ location }: { location: Location }) => (
  <Routes location={location}>
    <Route
      path="/"
      element={<MapPage />}
    />
    <Route
      path="/profile"
      element={<ProfilePage />}
    />
    <Route
      path="/experience"
      element={<ExperiencePage />}
    />
    <Route
      path="/blog"
      element={<JournalPage />}
    />
    <Route
      path="/blog/:slug"
      element={<ArticlePage />}
    />
    <Route
      path="/contact"
      element={<ContactPage />}
    />
    {Object.entries(REDIRECTS).map(([from, to]) => (
      <Route
        key={from}
        path={from}
        element={
          <Navigate
            to={to}
            replace
          />
        }
      />
    ))}
    <Route
      path="*"
      element={<SignalLostPage />}
    />
  </Routes>
)
