import { Link, NavLink } from 'react-router-dom';
import { telHref, useApi } from '../api.js';
import Logo from './Logo.jsx';

export const tabs = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/locations', label: 'Locations' },
  { to: '/about', label: 'About us' },
  { to: '/prices', label: 'Our prices' },
];

export default function Header() {
  const { data: business } = useApi('/business');

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Bluewater Auto Detailing, home">
          <Logo />
          <span className="brand__name">
            Bluewater
            <small>Auto Detailing</small>
          </span>
        </Link>

        <nav className="tabs" aria-label="Main">
          <ul>
            {tabs.map((tab) => (
              <li key={tab.to}>
                <NavLink to={tab.to} end={tab.end} className="tabs__link">
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {business && (
          <a className="header-call" href={telHref(business.phone)}>
            <span>Call us</span> {business.phone}
          </a>
        )}
      </div>
    </header>
  );
}
