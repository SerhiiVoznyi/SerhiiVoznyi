import * as routing from './config/routing'
import { Navigate, Route, Routes } from 'react-router-dom'
import { About, Home, Login, PostDetail, Posts, Register, User } from './pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={routing.home.path}
        element={<Home />}
      />
      <Route
        path={routing.about.path}
        element={<About />}
      />
      <Route
        path={routing.blog.path}
        element={<Posts />}
      />
      <Route
        path={routing.search.path}
        element={<Navigate
          replace
          to={routing.blog.path}
        />}
      />
      <Route
        path="/posts/:id"
        element={<PostDetail />}
      />
      <Route
        path={routing.login.path}
        element={<Login />}
      />
      <Route
        path={routing.registration.path}
        element={<Register />}
      />
      <Route
        path={routing.user.path}
        element={<User />}
      />
    </Routes>
  )
}
