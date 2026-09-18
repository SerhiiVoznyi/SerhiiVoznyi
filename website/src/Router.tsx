import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/home/home'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={<HomePage />}
      />
    </Routes>
  )
}
