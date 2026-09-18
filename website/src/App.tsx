import './app.sass'
import './styles/variables.sass'
import '@mantine/core/styles.css'

import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import { AppRouter } from './router'

const App = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: "'Source Sans 3', sans-serif",
        headings: { fontFamily: "'Source Sans 3', sans-serif" },
      }}>
      <BrowserRouter>
        <div className="app-shell">
          <main className="app-page">
            <AppRouter />
          </main>
          <footer className="app-footer">
            <p>
              <small>&copy; {new Date().getFullYear()} Serhii Voznyi</small>
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
