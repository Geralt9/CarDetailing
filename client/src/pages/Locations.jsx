import { money, telHref, useApi } from '../api.js';
import PageIntro from '../components/PageIntro.jsx';
import Status from '../components/Status.jsx';

function mapsUrl(loc) {
  const q = `${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export default function Locations() {
  const { data, error } = useApi('/locations');

  return (
    <>
      <PageIntro title="Locations">
        Visit one of our two shops, or book a mobile detail and we'll come to your home or office.
      </PageIntro>

      <div className="section-inner">
        {!data ? (
          <Status error={error} what="locations" />
        ) : (
          <>
            <div className="locations">
              {data.locations.map((loc) => (
                <article key={loc.id} className="location">
                  <h2>{loc.name}</h2>
                  <address className="location__address">
                    {loc.street}<br />
                    {loc.city}, {loc.state} {loc.zip}
                  </address>
                  <p>{loc.notes}</p>
                  <table className="hours">
                    <caption className="visually-hidden">Opening hours for {loc.name}</caption>
                    <tbody>
                      {loc.hours.map((h) => (
                        <tr key={h.days} className={h.hours === 'Closed' ? 'is-closed' : ''}>
                          <th scope="row">{h.days}</th>
                          <td>{h.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="location__actions">
                    <a className="button button--primary" href={mapsUrl(loc)} target="_blank" rel="noreferrer">
                      Get directions
                    </a>
                    <a className="button button--quiet" href={telHref(loc.phone)}>{loc.phone}</a>
                  </p>
                </article>
              ))}
            </div>

            <section className="mobile-area">
              <div>
                <h2 className="section-title">Mobile detailing</h2>
                <p className="section-lede">
                  Our van carries its own water tank and generator, so all we need is a spot
                  to park beside your car. Mobile jobs are washes, interiors and maintenance
                  packages. Paint correction and coatings are done at the Fairview shop.
                </p>
              </div>
              <table className="price-table">
                <thead>
                  <tr>
                    <th scope="col">Town</th>
                    <th scope="col" className="num">Travel fee</th>
                  </tr>
                </thead>
                <tbody>
                  {data.serviceAreas.map((a) => (
                    <tr key={a.town}>
                      <th scope="row">{a.town}</th>
                      <td className="num">{a.travel_fee_cents ? money(a.travel_fee_cents) : 'Free'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </>
  );
}
