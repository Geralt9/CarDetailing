import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { asset, money, useApi } from '../api.js';
import PageIntro from '../components/PageIntro.jsx';
import Status from '../components/Status.jsx';

export default function Services() {
  const { data: services, error } = useApi('/services');
  const { hash } = useLocation();

  // Jump to a service when arriving from a link like /services#ceramic
  useEffect(() => {
    if (services && hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [services, hash]);

  return (
    <>
      <PageIntro title="Services" image={asset('img/rinse.jpg')}>
        Every service below can be booked on its own or as part of a package.
      </PageIntro>

      <div className="section-inner">
        {!services ? (
          <Status error={error} what="services" />
        ) : (
          <>
            <nav className="jump-list" aria-label="Services on this page">
              {services.map((s) => (
                <a key={s.id} href={`#${s.slug}`}>{s.name}</a>
              ))}
            </nav>

            <div className="service-list">
              {services.map((s) => (
                <article key={s.id} id={s.slug} className="service">
                  <header className="service__head">
                    <h2>{s.name}</h2>
                    <dl className="service__facts">
                      <div><dt>Takes</dt><dd>{s.duration_label}</dd></div>
                      <div><dt>From</dt><dd>{money(s.from_price_cents)}</dd></div>
                    </dl>
                  </header>
                  <div className="service__body">
                    <p className="service__summary">{s.summary}</p>
                    <p>{s.details}</p>
                    <h3 className="service__included">Included</h3>
                    <ul className="checklist">
                      {s.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <p className="after-note">
              Not sure what your car needs? <Link to="/locations">Stop by the shop</Link> and we'll take a look for free.
            </p>
          </>
        )}
      </div>
    </>
  );
}
