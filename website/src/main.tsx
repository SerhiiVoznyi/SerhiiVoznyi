import '@mantine/core/styles/baseline.css'
import '@mantine/core/styles/default-css-variables.css'
import '@mantine/core/styles/global.css'
import '@mantine/core/styles/Tooltip.css'
import '@mantine/core/styles/VisuallyHidden.css'

import { createRoot } from 'react-dom/client'

import App from './app.tsx'

createRoot(document.getElementById('root')!).render(<App />)
