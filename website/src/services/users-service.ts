import { ApiService } from './api-base-service'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
}

export class UserService extends ApiService {
  constructor() {
    super('[UserService]')
  }

  async load(): Promise<User> {
    return await this.get<User>(this.api.users)
  }
}
