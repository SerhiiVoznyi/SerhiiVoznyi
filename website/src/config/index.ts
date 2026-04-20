export * from './routing'
export type AppConfig = {
  api: ApiConfig
  auth: AuthApiConfig
}

export type AuthApiConfig = {
  baseUrl: string
  login: '/login'
}

export type ApiConfig = {
  baseUrl: string
  users: '/users'
  post: '/posts'
}

const getAppConfig = (): AppConfig => {
  return {
    api: {
      baseUrl: 'https://localhost:7174/api',
      users: '/users',
      post: '/posts',
    },
    auth: {
      baseUrl: 'https://localhost:7238/api',
      login: '/login',
    },
  }
}

export default getAppConfig
