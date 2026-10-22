-- DEMO DATA ONLY
-- This file contains placeholder data for development and testing purposes.
-- All records are marked with is_demo = true.
-- DO NOT use this data in production without verification from the clinic owner.

-- Demo Clinic Settings
INSERT INTO clinic_settings (
  clinic_name,
  doctor_name,
  phone,
  whatsapp_number,
  email,
  address,
  city,
  state,
  pin_code,
  google_maps_url,
  latitude,
  longitude,
  meta_title,
  meta_description,
  is_demo
) VALUES (
  'Shri Krishna Physiotherapy Clinic',
  'Dr. Suresh Yadav',
  '7891426494',
  '917891426494', -- DEMO: Pending verification
  'demo@clinic.example', -- DEMO: Replace with real email
  'Demo Street, Main Road', -- DEMO: Replace with real address
  'Demo City', -- DEMO: Replace with real city
  'Demo State', -- DEMO: Replace with real state
  '000000', -- DEMO: Replace with real PIN code
  'https://www.google.com/maps?q=27.2924909,75.1829705',
  27.2924909,
  75.1829705,
  'Shri Krishna Physiotherapy Clinic - Dr. Suresh Yadav',
  'Professional physiotherapy services by Dr. Suresh Yadav at Shri Krishna Physiotherapy Clinic.',
  true
);

-- Demo Doctor Profile
INSERT INTO doctor_profiles (
  name,
  qualifications,
  registration_number,
  experience_years,
  specializations,
  biography,
  is_demo
) VALUES (
  'Dr. Suresh Yadav',
  ARRAY['BPTh/BPT', 'MPT (Demo)'], -- DEMO: Replace with real qualifications
  'DEMO-REG-12345', -- DEMO: Replace with real registration number
  10, -- DEMO: Replace with real experience
  ARRAY['Orthopedic Rehabilitation', 'Sports Injury', 'Neurological Rehabilitation'], -- DEMO: Replace with real specializations
  'Dr. Suresh Yadav is a dedicated physiotherapist with expertise in various rehabilitation techniques. This is demo biography text and should be replaced with actual professional details.', -- DEMO: Replace with real biography
  true
);

-- Demo Services
INSERT INTO services (slug, title, description, detailed_description, icon, price_range, duration_minutes, is_published, order_index, is_demo) VALUES
('orthopedic-rehabilitation', 'Orthopedic Rehabilitation', 'Comprehensive rehabilitation for musculoskeletal conditions', 'Detailed description of orthopedic rehabilitation services. This is demo content and should be replaced with actual service details.', 'bone', '₹500-₹1000', 45, true, 1, true),
('sports-injury-treatment', 'Sports Injury Treatment', 'Specialized care for athletes and sports-related injuries', 'Detailed description of sports injury treatment. This is demo content and should be replaced with actual service details.', 'activity', '₹600-₹1200', 60, true, 2, true),
('neurological-rehabilitation', 'Neurological Rehabilitation', 'Rehabilitation for neurological conditions', 'Detailed description of neurological rehabilitation. This is demo content and should be replaced with actual service details.', 'brain', '₹700-₹1500', 60, true, 3, true),
('post-surgical-rehabilitation', 'Post-Surgical Rehabilitation', 'Recovery programs after surgery', 'Detailed description of post-surgical rehabilitation. This is demo content and should be replaced with actual service details.', 'heart-pulse', '₹800-₹1500', 45, true, 4, true),
('pediatric-physiotherapy', 'Pediatric Physiotherapy', 'Specialized care for children', 'Detailed description of pediatric physiotherapy. This is demo content and should be replaced with actual service details.', 'baby', '₹500-₹1000', 30, true, 5, true);

-- Demo Equipment
INSERT INTO equipment (name, description, is_published, order_index, is_demo) VALUES
('Ultrasound Therapy Machine', 'Used for deep tissue healing and pain relief. Demo description.', true, 1, true),
('TENS Unit', 'Transcutaneous Electrical Nerve Stimulation for pain management. Demo description.', true, 2, true),
('Exercise Ball', 'For core strengthening and balance training. Demo description.', true, 3, true),
('Resistance Bands', 'Various resistance levels for strength training. Demo description.', true, 4, true),
('Traction Table', 'For spinal decompression therapy. Demo description.', true, 5, true);

-- Demo Weekly Schedule (DEMO: Replace with actual hours)
INSERT INTO weekly_schedule (day_of_week, is_closed, morning_start, morning_end, evening_start, evening_end, is_demo) VALUES
(0, false, '09:00', '13:00', '16:00', '20:00', true), -- Sunday
(1, false, '09:00', '13:00', '16:00', '20:00', true), -- Monday
(2, false, '09:00', '13:00', '16:00', '20:00', true), -- Tuesday
(3, false, '09:00', '13:00', '16:00', '20:00', true), -- Wednesday
(4, false, '09:00', '13:00', '16:00', '20:00', true), -- Thursday
(5, false, '09:00', '13:00', '16:00', '20:00', true), -- Friday
(6, true, NULL, NULL, NULL, NULL, true); -- Saturday (closed in demo)

-- Demo FAQs
INSERT INTO faqs (question, answer, is_published, order_index, is_demo) VALUES
('What should I bring to my first appointment?', 'Please bring any medical records, doctor referrals, and wear comfortable clothing. This is demo answer.', true, 1, true),
('How long does a typical session last?', 'Sessions typically last 30-60 minutes depending on the treatment. This is demo answer.', true, 2, true),
('Do you accept insurance?', 'Please contact us directly for insurance coverage information. This is demo answer.', true, 3, true),
('What payment methods do you accept?', 'We accept cash, UPI, and bank transfers. This is demo answer.', true, 4, true);

-- Demo Testimonials
INSERT INTO testimonials (patient_name, content, rating, is_published, is_demo) VALUES
('Patient A', 'Excellent treatment and care. Highly recommended! This is demo testimonial.', 5, true, true),
('Patient B', 'Dr. Suresh is very professional and knowledgeable. This is demo testimonial.', 5, true, true),
('Patient C', 'Great results after just a few sessions. This is demo testimonial.', 4, true, true);
