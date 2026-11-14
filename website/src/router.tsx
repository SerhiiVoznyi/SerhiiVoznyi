import { type Location, Navigate, Route, Routes } from 'react-router-dom'

import {
  ArticlePage,
  DossierPage,
  IdentityPage,
  MapPage,
  SignalLostPage,
  TransmissionsPage,
  UplinkPage,
} from './pages'

export const AppRouter = ({ location }: { location: Location }) => (
  <Routes location={location}>
    <Route
      path="/"
      element={<MapPage />}
    />
    <Route
      path="/identity"
      element={<IdentityPage />}
    />
    <Route
      path="/dossier"
      element={<DossierPage />}
    />
    <Route
      path="/blog"
      element={<TransmissionsPage />}
    />
    <Route
      path="/blog/:slug"
      element={<ArticlePage />}
    />
    <Route
      path="/uplink"
      element={<UplinkPage />}
    />
    <Route
      path="/home"
      element={
        <Navigate
          to="/"
          replace
        />
      }
    />
    <Route
      path="*"
      element={<SignalLostPage />}
    />
  </Routes>
)
