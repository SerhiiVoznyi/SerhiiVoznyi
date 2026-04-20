import { Brand } from '..'
import { APP_ROUTES } from '../../config/routing'
import './navigation.sass'

import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const path = useLocation()

  const routs = [...APP_ROUTES.filter((_) => _.isInMenu)]

  const resolve = (name?: string, ...args: string[]): string => {
    return [name ? `app-navigation-${name}` : 'app-navigation', ...args].join(' ')
  }

  const isActive = (currentPath: string, linkPath: string): string =>
    currentPath === linkPath ||
    (linkPath.length > 1 &&
      currentPath.replaceAll('/', '').startsWith(linkPath.replaceAll('/', '')))
      ? 'active'
      : ''

  return (
    <nav className={resolve()}>
      <Brand
        className={resolve('brand')}
        bold="text-bold"
        size="text-h4"
      />

      <ul className={resolve('menu')}>
        {routs.map((_, index) => {
          const key = resolve('menu-item') + `-${index}`
          return (
            <li
              id={key}
              key={key}>
              <Link
                to={_.path}
                className={resolve('menu-item', isActive(path.pathname, _.path))}>
                <i className={_.iconClass}></i> {_.text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { Navigation }
