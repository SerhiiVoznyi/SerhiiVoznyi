import axios from 'axios'

import getAppConfig, { AuthApiConfig } from '../config'

export type AuthData = {
  token: string
  type: string
  expiration: number
}

export class AuthService {
  protected readonly name: string

  constructor() {
    this.name = '[AuthService]'
  }

  async login(login: string, password: string): Promise<AuthData | null> {
    try {
      const auth: AuthApiConfig = getAppConfig().auth
      const result = await axios.post(`${auth.baseUrl}${auth.login}`, {
        login,
        password,
      })

      if (result.status === 200) {
        localStorage.setItem('AuthData', JSON.stringify(result.data))
      }

      return result.data
    } catch {
      //ignore
    }
    return null
  }

  static getAuth(): AuthData {
    const data = localStorage.getItem('AuthData')
    if (data != null) {
      try {
        return JSON.parse(data)
      } catch {
        // ignore
      }
    }
    return {} as AuthData
  }
}
