import { APP_LOGIN_URL } from '../lib/urls'

const navItems = [
  { href: '#product', label: 'Product' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#why-ideate', label: 'Why Ideate' },
  { href: '#about', label: 'About' },
] as const

type HeaderProps = {
  menuOpen: boolean
  onToggleMenu: () => void
  onNavigate: () => void
}

export function Header({ menuOpen, onToggleMenu, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" onClick={onNavigate}>
          <span className="brand__mark" aria-hidden="true">I</span>
          <span className="brand__name">Ideate</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="sign-in-link" href={APP_LOGIN_URL}>
            Sign in
          </a>
          <a className="btn btn--primary btn--sm" href="#beta" onClick={onNavigate}>
            Join the Beta
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={onToggleMenu}
          >
            <span className="sr-only">
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={onNavigate}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className="sign-in-link" href={APP_LOGIN_URL}>
                Sign in
              </a>
            </li>
            <li>
              <a className="btn btn--primary" href="#beta" onClick={onNavigate}>
                Join the Beta
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
