import { Link } from 'react-router-dom';
import { useApi } from '../api.js';

const habits = [
  { title: 'No automatic brushes', text: 'Brushes and dirty towels are what put swirl marks in paint. Every car is washed by hand with clean mitts.' },
  { title: 'Photos before we start', text: 'We note existing chips and scratches with you at drop-off, so there are no surprises at pickup.' },
  { title: 'Water-based dressings', text: 'No greasy silicone on your dash or tires. It attracts dust and slings onto the paint.' },
  { title: 'The price we quote is the price', text: 'If something changes once we start, we call you before doing any extra work.' },
];

export default function About() {
  const { data: business } = useApi('/business');
  const years = business ? new Date().getFullYear() - business.founded : null;

  return (
    <>
      <section className="about-hero">
        <img src="/img/hand-wash.jpg" alt="A detailer hand-washing a black sports car with a foam mitt" />
      </section>

      <div className="section-inner about">
        <div className="about__story">
          <h1 className="display">About us</h1>
          <p className="about__lede">
            Bluewater started with one pressure washer and a borrowed garage
            {business ? ` in ${business.founded}` : ''}. {years ? `${years} years` : 'Years'} later
            we have two locations, a mobile van and a small team that still washes every car by hand.
          </p>
          <p>
            Most of our customers are regular drivers, not collectors. They want the car
            to feel new again on the inside and look good in the driveway, without paying
            showroom money every month. So we built our packages around that: a solid
            maintenance clean you can book every few weeks, and a full detail for when
            the car really needs it.
          </p>
          <p>
            For the people who do want perfect paint, the Fairview shop has indoor bays and
            proper lighting for correction and ceramic coating. We'll tell you honestly if
            your car needs it, and just as often, we'll tell you it doesn't.
          </p>
          <figure className="about__quote">
            <blockquote>
              “If we wouldn't do it to our own car, we won't do it to yours.”
            </blockquote>
            <figcaption>Dan Reyes, owner</figcaption>
          </figure>
        </div>

        <aside className="about__habits">
          <h2 className="section-title">How we work</h2>
          <dl>
            {habits.map((h) => (
              <div key={h.title}>
                <dt>{h.title}</dt>
                <dd>{h.text}</dd>
              </div>
            ))}
          </dl>
          <Link className="button button--primary" to="/services">See our services</Link>
        </aside>
      </div>
    </>
  );
}
