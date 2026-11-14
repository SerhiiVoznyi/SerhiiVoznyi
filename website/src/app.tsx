import './styles/variables.sass'
import './styles/base.sass'
import './lib/sheet-stack/sheet-stack.sass'
import './lib/spread-transition/spread-transition.sass'
import './styles/content.sass'
import './app.sass'

import { BrowserRouter } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import { ReaderShell } from './components/reader-shell/reader-shell'
import { AudioProvider } from './lib/audio'
import { ReaderProvider } from './lib/reader'
import { AppRouter } from './router'

const theme = createTheme({
  fontFamily: "'Source Sans 3', system-ui, sans-serif",
  fontFamilyMonospace: "'Share Tech Mono', ui-monospace, monospace",
  headings: { fontFamily: "'Chakra Petch', 'Source Sans 3', sans-serif" },
  primaryColor: 'yellow',
  defaultRadius: 0,
})

const App = () => (
  <MantineProvider
    theme={theme}
    forceColorScheme="dark">
    <BrowserRouter>
      <ReaderProvider>
        <AudioProvider>
          <ReaderShell renderSpread={(location) => <AppRouter location={location} />} />
          <div
            className="app-grain"
            aria-hidden="true"
          />
        </AudioProvider>
      </ReaderProvider>
    </BrowserRouter>
  </MantineProvider>
)

export default App
