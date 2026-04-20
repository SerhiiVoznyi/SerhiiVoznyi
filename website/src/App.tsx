import './app.sass'

import './styles/variables.sass'
import './styles/text.sass'
import './styles/mantine.sass'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { Footer, Header } from './components'
import { AppRouter } from './Router'

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <main className="app-page">
          <AppRouter />
        </main>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
