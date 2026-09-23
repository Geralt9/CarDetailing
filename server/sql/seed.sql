-- Placeholder content for the proposal. Swap in the client's real details.

INSERT INTO business (id, name, phone, email, founded, region) VALUES
  (1, 'Bluewater Auto Detailing', '(555) 014-2290', 'book@bluewaterdetailing.com', 2016, 'Lake County');

INSERT INTO services (id, slug, name, summary, details, duration_label, from_price_cents, sort_order) VALUES
  (1, 'exterior', 'Exterior hand wash',
   'Two-bucket wash, wheels and tires, dried with filtered air so nothing drags across the paint.',
   'Every wash starts with a pre-rinse and snow foam to lift grit before a mitt ever touches the car. We clean wheel faces and barrels with separate tools, dress the tires with a water-based product that won''t sling, and finish with a spray sealant good for about a month.',
   '1 to 1.5 hours', 6500, 1),
  (2, 'interior', 'Interior detail',
   'Vacuum, steam and extract the seats and carpets, then clean every hard surface you touch.',
   'We pull the mats, vacuum under and between the seats, and hot-water extract fabric upholstery and carpet. Leather gets a pH-neutral cleaner and a matte conditioner. Vents, cupholders, door pockets and seat rails are cleaned by hand, and glass is done last so nothing streaks it.',
   '2 to 3 hours', 12000, 2),
  (3, 'correction', 'Paint correction',
   'Machine polishing that removes swirl marks, light scratches and water spotting from the clear coat.',
   'We measure paint depth first, then test-spot a small panel to find the gentlest combination of pad and polish that gets the result. A one-step polish takes out most wash marring. A two-step compound and polish handles deeper defects. You''ll see the difference under the lights before we move on.',
   '5 to 12 hours', 38000, 3),
  (4, 'ceramic', 'Ceramic coating',
   'A hard, slick layer over the paint that makes washing easier and keeps the gloss for years.',
   'Coating goes on only after the paint has been decontaminated and corrected, because it locks in whatever is underneath. We offer a 3-year and a 5-year coating, and both include wheel faces and glass. The car stays with us overnight so the coating can cure indoors.',
   '1 to 2 days', 90000, 4),
  (5, 'headlights', 'Headlight restoration',
   'Sand, polish and UV-seal yellowed headlight lenses so they''re clear and bright again.',
   'Oxidized lenses cut light output at night. We wet-sand the damaged layer away, polish the lens back to clear, and apply a UV-resistant sealant so the yellowing doesn''t come right back.',
   '1 hour', 9000, 5);

INSERT INTO service_items (service_id, item, sort_order) VALUES
  (1, 'Snow foam pre-wash', 1),
  (1, 'Two-bucket contact wash', 2),
  (1, 'Wheel faces, barrels and tires', 3),
  (1, 'Air and microfiber dry', 4),
  (1, 'Spray sealant', 5),
  (2, 'Full vacuum including trunk', 1),
  (2, 'Hot-water carpet and seat extraction', 2),
  (2, 'Leather clean and condition', 3),
  (2, 'Dash, console and door panels', 4),
  (2, 'Streak-free glass', 5),
  (3, 'Paint depth readings', 1),
  (3, 'Iron and clay decontamination', 2),
  (3, 'One- or two-step machine polish', 3),
  (3, 'Panel wipe and inspection', 4),
  (4, 'Full correction included', 1),
  (4, '3- or 5-year coating', 2),
  (4, 'Wheels and glass coated', 3),
  (4, 'Indoor overnight cure', 4),
  (5, 'Wet sand and polish', 1),
  (5, 'UV sealant', 2);

INSERT INTO packages (id, name, blurb, hours_label, featured, sort_order) VALUES
  (1, 'Maintenance', 'For cars that are already in good shape and just need a proper clean.', 'About 2 hours', 0, 1),
  (2, 'Full detail', 'Inside and out. The one most people book twice a year.', 'About 4 hours', 1, 2),
  (3, 'Showroom', 'Full detail plus a one-step polish to bring back the gloss.', 'Full day', 0, 3);

INSERT INTO package_prices (package_id, vehicle_size, price_cents) VALUES
  (1, 'car', 9500),  (1, 'suv', 11500), (1, 'truck', 12500),
  (2, 'car', 22000), (2, 'suv', 26000), (2, 'truck', 28000),
  (3, 'car', 48000), (3, 'suv', 56000), (3, 'truck', 60000);

INSERT INTO package_items (package_id, item, sort_order) VALUES
  (1, 'Exterior hand wash', 1),
  (1, 'Wheels and tires', 2),
  (1, 'Interior vacuum and wipe-down', 3),
  (1, 'Glass inside and out', 4),
  (2, 'Everything in Maintenance', 1),
  (2, 'Clay bar decontamination', 2),
  (2, 'Carpet and seat extraction', 3),
  (2, 'Leather clean and condition', 4),
  (2, '6-month paint sealant', 5),
  (3, 'Everything in Full detail', 1),
  (3, 'One-step machine polish', 2),
  (3, 'Engine bay clean', 3),
  (3, '12-month paint sealant', 4);

INSERT INTO addons (name, price_cents, note, sort_order) VALUES
  ('Pet hair removal', 4000, 'Starting price, depends on the amount', 1),
  ('Headlight restoration', 9000, 'Pair of headlights', 2),
  ('Engine bay clean', 5000, NULL, 3),
  ('Odor treatment', 6000, 'Ozone, needs 2 extra hours', 4),
  ('Ceramic glass coating', 7500, 'Windshield and front windows', 5);

INSERT INTO locations (id, name, street, city, state, zip, phone, notes, sort_order) VALUES
  (1, 'Fairview shop', '1480 Harbor Road, Unit 4', 'Fairview', 'CA', '94000', '(555) 014-2290',
   'Indoor bays with proper lighting. Paint correction and ceramic coating are done here.', 1),
  (2, 'Marina drop-off', '22 Dockside Lane', 'Port Ellis', 'CA', '94010', '(555) 014-2291',
   'Drop your car off in the morning, pick it up after work. Washes and interiors only.', 2);

INSERT INTO location_hours (location_id, days, hours, sort_order) VALUES
  (1, 'Monday to Friday', '8:00 am to 6:00 pm', 1),
  (1, 'Saturday', '9:00 am to 4:00 pm', 2),
  (1, 'Sunday', 'Closed', 3),
  (2, 'Tuesday to Saturday', '7:30 am to 5:30 pm', 1),
  (2, 'Sunday and Monday', 'Closed', 2);

INSERT INTO service_areas (town, travel_fee_cents, sort_order) VALUES
  ('Fairview', 0, 1),
  ('Port Ellis', 0, 2),
  ('Cedar Hills', 0, 3),
  ('Lakeside', 1500, 4),
  ('North Bend', 1500, 5),
  ('Pine Crossing', 2500, 6);
