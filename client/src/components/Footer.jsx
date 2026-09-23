import { Link } from 'react-router-dom';
import { telHref, useApi } from '../api.js';
import { tabs } from './Header.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const { data: business } = useApi('/business');
  const { data: locationData } = useApi('/locations');
  const shop = locationData?.locations[0];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo size={40} />
          <p>
            Hand washes, interiors, paint correction and ceramic coating
            {business ? ` in ${business.region} since ${business.founded}.` : '.'}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="site-footer__heading">Pages</h2>
          <ul>
            {tabs.map((tab) => (
              <li key={tab.to}><Link to={tab.to}>{tab.label}</Link></li>
            ))}
          </ul>
        </nav>

        {business && (
          <div>
            <h2 className="site-footer__heading">Get in touch</h2>
            <ul>
              <li><a href={telHref(business.phone)}>{business.phone}</a></li>
              <li><a href={`mailto:${business.email}`}>{business.email}</a></li>
            </ul>
          </div>
        )}

        {shop && (
          <div>
            <h2 className="site-footer__heading">{shop.name}</h2>
            <address>
              {shop.street}<br />
              {shop.city}, {shop.state} {shop.zip}
            </address>
            <p className="site-footer__hours">
              {shop.hours.map((h) => (
                <span key={h.days}>{h.days}: {h.hours}<br /></span>
              ))}
            </p>
          </div>
        )}
      </div>
      <p className="site-footer__legal">
        © {new Date().getFullYear()} {business?.name ?? 'Bluewater Auto Detailing'}. Fully insured.
      </p>
    </footer>
  );
}
