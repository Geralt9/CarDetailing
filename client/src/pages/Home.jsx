import { Link } from 'react-router-dom';
import { asset, money, telHref, useApi } from '../api.js';
import BeforeAfter from '../components/BeforeAfter.jsx';

const steps = [
  { name: 'Rinse and foam', text: 'Loose dirt comes off with water and snow foam before anything touches the paint.', time: '20 min' },
  { name: 'Decontaminate', text: 'Iron remover and a clay bar pull out the grit that washing leaves behind.', time: '40 min' },
  { name: 'Interior', text: 'Vacuum, extract the carpets and seats, clean every panel and the glass.', time: '2 hr' },
  { name: 'Protect', text: 'Sealant on the paint, dressing on the tires, a last walk-around with you.', time: '30 min' },
];

export default function Home() {
  const { data: business } = useApi('/business');
  const { data: packages } = useApi('/packages');
  const { data: services } = useApi('/services');
  const { data: locationData } = useApi('/locations');

  return (
    <>
      <section className="hero">
        <h1 className="display hero__title">Hand-washed, polished and sealed.</h1>
        <div className="hero__copy">
          <p className="hero__lede">
            Bring your car to our Fairview shop or book a mobile detail in your driveway.
            Everything is done by hand, and we show you the result before you pay.
          </p>
          <div className="hero__actions">
            {business && (
              <a className="button button--primary" href={telHref(business.phone)}>
                Call to book
              </a>
            )}
            <Link className="button button--quiet" to="/prices">See our prices</Link>
          </div>
          {packages && (
            <p className="hero__note">
              Full detail from {money(packages.find((p) => p.featured)?.prices.car ?? packages[0].prices.car)} for a sedan.
            </p>
          )}
        </div>
        <div className="hero__media">
          <BeforeAfter src={asset('img/hero-car.jpg')} alt="A grey sedan with freshly polished, glossy paint parked by a lake" />
        </div>
      </section>

      <section className="process">
        <div className="section-inner">
          <h2 className="section-title">How a full detail goes</h2>
          <p className="section-lede">About four hours for a sedan. You can wait in the shop or we'll text you when it's ready.</p>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.name} className="steps__item">
                <h3>{step.name}</h3>
                <p>{step.text}</p>
                <span className="steps__time">{step.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-services">
        <div className="section-inner split">
          <div>
            <h2 className="section-title">What we do</h2>
            <p className="section-lede">
              From a quick maintenance wash to multi-day paint correction.
              Every job gets the same careful prep.
            </p>
            <Link className="text-link" to="/services">Read about each service</Link>
          </div>
          {services && (
            <ul className="service-index">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.slug}`}>
                    <span className="service-index__name">{s.name}</span>
                    <span className="service-index__price">from {money(s.from_price_cents)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {locationData && (
        <section className="home-locations">
          <div className="section-inner">
            <h2 className="section-title">Two locations, or we come to you</h2>
            <div className="home-locations__grid">
              {locationData.locations.map((loc) => (
                <div key={loc.id} className="home-locations__place">
                  <h3>{loc.name}</h3>
                  <p>{loc.street}, {loc.city}</p>
                  <p className="muted">{loc.hours[0].days}, {loc.hours[0].hours}</p>
                </div>
              ))}
              <div className="home-locations__place">
                <h3>Mobile detailing</h3>
                <p>{locationData.serviceAreas.map((a) => a.town).join(', ')}</p>
                <p className="muted">We bring water and power.</p>
              </div>
            </div>
            <Link className="text-link" to="/locations">Hours, directions and travel fees</Link>
          </div>
        </section>
      )}
    </>
  );
}
