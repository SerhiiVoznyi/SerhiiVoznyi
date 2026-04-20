import { useLocation } from 'react-router-dom'

export class StyleClassResolver {
  private baseComponentName: string
  constructor(componentName: string) {
    this.baseComponentName = componentName
  }

  resolve = (name?: string): string =>
    name ? `${this.baseComponentName}-${name}` : this.baseComponentName

  isActive = (path: string): string => (useLocation().pathname === path ? 'active' : '')
}
