export type AppRoute = {
  path: string
  text: string
  isInMenu?: boolean
  iconClass?: string
}

export const home: AppRoute = {
  path: '/',
  text: 'Home',
  isInMenu: true,
  iconClass: 'las la-home',
}

export const blog: AppRoute = {
  path: '/blog',
  text: 'Blog',
  isInMenu: true,
  iconClass: 'lar la-newspaper',
}

export const about: AppRoute = {
  path: '/about',
  text: 'About',
  isInMenu: true,
  iconClass: 'las la-question-circle',
}

export const search: AppRoute = {
  path: '/search',
  text: 'Search',
}

export const login: AppRoute = {
  path: '/login',
  text: 'Login',
}

export const registration: AppRoute = {
  path: '/register',
  text: 'Register',
}

export const user: AppRoute = {
  path: '/user',
  text: 'User',
  isInMenu: true,
  iconClass: 'las la-user-cog',
}

export const APP_ROUTES = [home, blog, about, search, login, registration, user]
