import './styles/variables.sass'
import './styles/base.sass'
import './lib/sheet-stack/sheet-stack.sass'
import './lib/spread-transition/spread-transition.sass'
import './styles/content.sass'
import './app.sass'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import { DisclaimerPanel } from './components/disclaimer-panel/disclaimer-panel'
import { ReaderShell } from './components/reader-shell/reader-shell'
import { READ_MODE_ROUTE } from './content/spreads'
import { AudioProvider } from './lib/audio'
import { ReaderProvider } from './lib/reader'
import { ReadModePage } from './pages'
import { AppRouter } from './router'

const theme = createTheme({
  fontFamily: "'Source Sans 3', system-ui, sans-serif",
  fontFamilyMonospace: "'Share Tech Mono', ui-monospace, monospace",
  headings: { fontFamily: "'Chakra Petch', 'Source Sans 3', sans-serif" },
  primaryColor: 'yellow',
  defaultRadius: 0,
})

const Artbook = () => (
  <ReaderProvider>
    <AudioProvider>
      <ReaderShell renderSpread={(location) => <AppRouter location={location} />} />
      <div
        className="app-grain"
        aria-hidden="true"
      />
    </AudioProvider>
  </ReaderProvider>
)

// Read mode is a plain document outside the artbook: no reader chrome, sheets or page turns.
const App = () => (
  <MantineProvider
    theme={theme}
    forceColorScheme="dark">
    <BrowserRouter>
      <Routes>
        <Route
          path={READ_MODE_ROUTE}
          element={<ReadModePage />}
        />
        <Route
          path="*"
          element={<Artbook />}
        />
      </Routes>
      <DisclaimerPanel />
    </BrowserRouter>
  </MantineProvider>
)

export default App
