import axios from 'axios'

import getAppConfig, { ApiConfig } from '../config'
import { AuthData, AuthService } from '.'

export abstract class ApiService {
  protected readonly name: string
  protected readonly api: ApiConfig
  protected readonly auth: AuthData

  constructor(name: string) {
    this.name = name
    this.api = getAppConfig().api
    this.auth = AuthService.getAuth()
    axios.defaults.baseURL = 'http://localhost:1010/'
    axios.defaults.headers.common = {
      Authorization: `${this.auth.type} ${this.auth.token}`,
    }
  }

  protected async get<T>(path: string): Promise<T> {
    const result = await axios.get(`${this.api.baseUrl}${path}`)
    return result.data
  }
}
