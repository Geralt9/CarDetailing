import { useState } from 'react';
import { money, telHref, useApi } from '../api.js';
import PageIntro from '../components/PageIntro.jsx';
import Status from '../components/Status.jsx';

const sizes = [
  { id: 'car', label: 'Car', hint: 'Sedans, coupes, hatchbacks' },
  { id: 'suv', label: 'SUV', hint: 'SUVs, crossovers, minivans' },
  { id: 'truck', label: 'Truck', hint: 'Pickups and full-size vans' },
];

export default function Prices() {
  const { data: packages, error } = useApi('/packages');
  const { data: addons } = useApi('/addons');
  const { data: business } = useApi('/business');
  const [size, setSize] = useState('car');
  const current = sizes.find((s) => s.id === size);

  return (
    <>
      <PageIntro title="Our prices">
        Pick your vehicle type to see what each package costs. Prices include materials and tax.
      </PageIntro>

      <div className="section-inner">
        <div className="size-picker">
          <div className="segmented" role="radiogroup" aria-label="Vehicle type">
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={size === s.id}
                className="segmented__option"
                onClick={() => setSize(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="muted">{current.hint}</p>
        </div>

        {!packages ? (
          <Status error={error} what="prices" />
        ) : (
          <div className="packages">
            {packages.map((p) => (
              <section key={p.id} className={`package ${p.featured ? 'package--featured' : ''}`}>
                {p.featured && <p className="package__flag">Most booked</p>}
                <h2 className="package__name">{p.name}</h2>
                <p className="package__price">
                  <span className="package__amount">{money(p.prices[size])}</span>
                  <span className="package__unit">{current.label.toLowerCase()}, {p.hours_label.toLowerCase()}</span>
                </p>
                <p className="package__blurb">{p.blurb}</p>
                <ul className="checklist">
                  {p.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
        )}

        {addons && (
          <section className="addons">
            <h2 className="section-title">Add-ons</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th scope="col">Add-on</th>
                  <th scope="col" className="num">Price</th>
                </tr>
              </thead>
              <tbody>
                {addons.map((a) => (
                  <tr key={a.id}>
                    <th scope="row">
                      {a.name}
                      {a.note && <span className="price-table__note">{a.note}</span>}
                    </th>
                    <td className="num">{money(a.price_cents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <p className="after-note">
          Very dirty cars, heavy pet hair or sand may cost more. We'll always tell you before we start.
          {business && <> Questions about a price? Call <a href={telHref(business.phone)}>{business.phone}</a>.</>}
        </p>
      </div>
    </>
  );
}
