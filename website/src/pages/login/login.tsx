import './login.sass'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '../../services'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const service = new AuthService()

    const auth = await service.login(username, password)

    if (auth !== null) {
      navigate('/')
    }
    // TODO: Send login request to API
    console.log('Logging in with:', { username, password })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export { Login }
