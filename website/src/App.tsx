import './app.sass'
import './styles/variables.sass'
import '@mantine/core/styles.css'

import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import { AppRouter } from './router'

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <main className="app-page">
          <AppRouter />
        </main>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
