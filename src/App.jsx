// src/App.jsx — full, ready-to-paste
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/* ────────  images  ────────────────────────────────────────── */
import heroImg from "@/assets/hero-banner.jpg";
import servicesImg from "@/assets/services-overview.jpg";
import qsCoreImg from "@/assets/qs-core.jpg";
import qsMethodImg from "@/assets/qs-method.jpg";
import qsTradesImg from "@/assets/qs-trades.jpg";
import qsProjImg from "@/assets/qs-project-types.jpg";
import pmCapsImg from "@/assets/pm-capabilities.jpg";
import pmToolImg from "@/assets/pm-tooling.jpg";
import designSrvImg from "@/assets/design-services.jpg";
import designBenImg from "@/assets/design-benefits.jpg";
import outsourceImg from "@/assets/outsourcing.jpg";

/* ────────  tiny layout helpers  ───────────────────────────── */
const Container = ({ children, className = "" }) => (
  <div className={`container mx-auto px-4 ${className}`}>{children}</div>
);

/*  Section with optional picture + left/right toggle  */
const Section = ({
  id,
  title,
  subtitle,
  image,
  imageAlt = "",
  reverse = false,
  children,
}) => (
  <section id={id} className="py-20">
    <Container>
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* text block */}
        <motion.div
          className={reverse ? "md:order-last" : ""}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
          {subtitle && <p className="mb-8 opacity-90">{subtitle}</p>}
          {children}
        </motion.div>

        {/* image block */}
        {image && (
          <motion.img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className={`w-full h-auto rounded-xl shadow-2xl ${
              reverse ? "md:order-first" : ""
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        )}
      </div>
    </Container>
  </section>
);

/* ────────  reusable quote form  ───────────────────────────── */
const QuoteForm = ({ compact = false }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook into email/API of your choice
    setSent(true);
  };

  if (sent)
    return (
      <div className="p-6 bg-green-50 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
        <p>Our team will be in touch within 24&nbsp;hours.</p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 ${compact ? "md:grid-cols-2" : ""}`}
    >
      <input
        type="text"
        name="name"
        placeholder="Name*"
        required
        value={form.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email*"
        required
        value={form.email}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="project"
        placeholder="Project type (e.g., Fit-out)"
        value={form.project}
        onChange={handleChange}
        className={`input ${compact ? "md:col-span-2" : ""}`}
      />
      <input
        type="text"
        name="budget"
        placeholder="Indicative budget (£)"
        value={form.budget}
        onChange={handleChange}
        className={`input ${compact ? "md:col-span-2" : ""}`}
      />
      <textarea
        name="message"
        placeholder="Tell us a little more…"
        rows="4"
        value={form.message}
        onChange={handleChange}
        className={`input resize-none ${
          compact ? "md:col-span-2" : ""
        } mb-2 md:mb-0`}
      />
      <Button
        type="submit"
        className={`w-full ${compact ? "md:col-span-2" : ""}`}
      >
        Request Quote
      </Button>
    </form>
  );
};

/* Tailwind shorthand */
const inputStyles =
  "input border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500";

/* add styles globally via a quick component override */
const GlobalStyles = () => (
  <style>
    {`
      .input { ${inputStyles}; }
    `}
  </style>
);

/* ────────  hero  ─────────────────────────────────────────── */
const Hero = () => (
  <div className="relative text-white">
    {/* photo layer */}
    <img
      src={heroImg}
      alt="QS Experts at work"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mix-blend-multiply" />
    {/* headline */}
    <Container className="relative py-32 flex flex-col items-center text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        Precision in Numbers, Excellence in Cost.
      </motion.h1>
      <p className="max-w-3xl text-lg md:text-xl mb-8 opacity-90">
        Transforming Spaces&nbsp;&amp; Delivering Projects with Accuracy,
        Efficiency, and Innovation.
      </p>
      <Button size="lg" asChild className="text-white font-semibold shadow-lg">
        <NavLink to="/contact">Get a Free Consultation</NavLink>
      </Button>
    </Container>
  </div>
);

/* ────────  services card data  ───────────────────────────── */
const servicesData = [
  {
    title: "Quantity Surveying",
    description:
      "Accurate cost estimation, efficient tendering, cost monitoring & value engineering tailored to your project.",
    icon: "📐",
    slug: "quantity-surveying",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project oversight, stakeholder alignment, and risk management for timely, on-budget delivery.",
    icon: "📊",
    slug: "project-management",
  },
  {
    title: "Architectural Design",
    description:
      "Innovative, compliant building designs from concept to completion, turning vision into built reality.",
    icon: "🏛️",
    slug: "architectural-design",
  },
  {
    title: "Outsourcing",
    description:
      "Seamless integration of our specialists into your team to unlock efficiency and scale with confidence.",
    icon: "🤝",
    slug: "outsourcing",
  },
];

/* card */
const ServiceCard = ({ title, description, icon, slug }) => (
  <Card className="flex flex-col items-center p-6 transition hover:shadow-xl">
    <Link
      to={`/services/${slug}`}
      className="flex flex-col items-center h-full w-full"
    >
      <CardContent className="flex flex-col items-center h-full w-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-center text-sm opacity-90 mb-auto">{description}</p>
        <Button variant="link" className="mt-4 text-indigo-600">
          Learn more →
        </Button>
      </CardContent>
    </Link>
  </Card>
);

/* ────────  nav / footer  ─────────────────────────────────── */
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => (
  <header className="bg-white/80 backdrop-blur shadow fixed w-full z-50">
    <Container className="py-3 flex justify-between items-center">
      <NavLink to="/" className="font-extrabold text-xl tracking-tight">
        QS&nbsp;Experts
      </NavLink>
      <nav className="hidden md:flex gap-6">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-indigo-600" : "text-gray-700"
              } hover:text-indigo-500`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Button size="sm" className="md:hidden" asChild>
        <NavLink to="/contact">Quote</NavLink>
      </Button>
    </Container>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 pt-16">
    <Container className="grid gap-10 md:grid-cols-3">
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Head Office</h4>
        <p>3&nbsp;Hardman&nbsp;Square</p>
        <p>Manchester&nbsp;M3&nbsp;3EB</p>
        <p>United&nbsp;Kingdom</p>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Contact</h4>
        <p className="mb-1">+44&nbsp;161&nbsp;768&nbsp;5324</p>
        <p className="mb-1">hello@qsexperts.co.uk</p>
        <p>Mon – Fri&nbsp;· 09 – 18&nbsp;GMT</p>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Social</h4>
        <p>LinkedIn · Twitter · WhatsApp</p>
      </div>
    </Container>
    <div className="text-center py-4 border-t border-gray-700 mt-12">
      © {new Date().getFullYear()} QS Experts Ltd. Registered in England & Wales
      · No. 08123456
    </div>
  </footer>
);

/* ────────  home + services overview  ─────────────────────── */
const Home = () => (
  <>
    <Hero />
    <Section
      id="services"
      title="Services We Offer"
      subtitle="A single-source partner for cost, design & delivery."
      image={servicesImg}
      imageAlt="Collage of QS, PM and Design projects"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((svc) => (
          <ServiceCard key={svc.slug} {...svc} />
        ))}
      </div>
    </Section>
  </>
);

const Services = () => (
  <Section id="services-page" title="Our Services">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {servicesData.map((svc) => (
        <ServiceCard key={svc.slug} {...svc} />
      ))}
    </div>
  </Section>
);

/* ────────  service template  ─────────────────────────────── */
const ServiceTemplate = ({ title, intro, sections }) => (
  <>
    <div className="bg-indigo-600 text-white py-24 text-center">
      <Container>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {intro && (
          <p className="max-w-3xl mx-auto text-lg opacity-90">{intro}</p>
        )}
      </Container>
    </div>

    {sections.map(
      ({ heading, content, image, imageAlt, reverse = false }, idx) => (
        <Section
          key={idx}
          title={heading}
          image={image}
          imageAlt={imageAlt}
          reverse={reverse}
        >
          {Array.isArray(content) ? (
            <ul className="list-disc max-w-3xl mx-auto space-y-2 pl-6">
              {content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <div
              className="prose max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </Section>
      )
    )}

    <Section id="quote-cta" title="Ready to discuss your project?">
      <QuoteForm compact />
    </Section>
  </>
);

/* ────────  individual service pages  ─────────────────────── */
const OutsourcingPage = () => (
  <ServiceTemplate
    title="Outsourcing for Work"
    intro="We integrate seamlessly with your team to deliver best-in-class results at reasonable prices."
    sections={[
      {
        heading: "Why Outsource to QS Experts?",
        content: [
          "Smart complex solutions – we thrive on challenging designs and construction problems.",
          "Brilliant team – seasoned construction professionals focused on client satisfaction.",
          "Rich experience – over 10 years across commercial, residential & industrial builds.",
          "Continuous support – post-handover assistance whenever you need to build again.",
          "Affordable pricing – flexible engagement models to match your budget.",
          "Modern technology – BIM, laser scanning & cloud collaboration baked into our workflow.",
        ],
        image: outsourceImg,
        imageAlt: "Remote collaboration session",
      },
    ]}
  />
);

const QuantitySurveyingPage = () => (
  <ServiceTemplate
    title="Quantity Survey & Estimating"
    intro="From early take-offs to final accounts, our chartered surveyors safeguard your budget and boost project value."
    sections={[
      {
        heading: "Core Services",
        content: [
          "Detailed material take-offs & BOQs in NRM1, NRM2, and SMM7 formats.",
          "Contractor estimates & variation assistance.",
          "Progress monitoring and interim payments.",
          "Risk & cost management throughout the lifecycle.",
        ],
        image: qsCoreImg,
        imageAlt: "Estimator reviewing drawings",
      },
      {
        heading: "Methodologies Explained",
        content: `
    <strong>NRM1:</strong> Elemental cost estimating for early budgeting.<br/>
    <strong>NRM2:</strong> Measured works & competitive tendering using bills of quantities.<br/>
    <strong>SMM7:</strong> Industry-standard measurement rules ensuring consistency across bids.
  `,
        image: qsMethodImg,
        imageAlt: "Cost-planning workflow diagram",
        reverse: true,
      },

      {
        heading: "Trade Coverage",
        content: [
          "Earthworks & foundations",
          "Concrete & masonry",
          "MEP and HVAC",
          "Finishes & fit-out",
          "IT & security systems",
          "Landscaping",
        ],
        image: qsTradesImg,
        imageAlt: "Icons of covered trades",
      },
      {
        heading: "Typical Project Types",
        content: [
          "Commercial",
          "Residential",
          "Industrial",
          "Renovation & retrofit",
        ],
        image: qsProjImg,
        imageAlt: "Mixed skyline of project types",
        reverse: true,
      },
    ]}
  />
);

const ProjectManagementPage = () => (
  <ServiceTemplate
    title="Project Management"
    intro="Turning vision into built reality—on time, on budget, every time."
    sections={[
      {
        heading: "End-to-End Capabilities",
        content: [
          "Program of Works & critical path analysis.",
          "Budget forecasting and cost control.",
          "Site evaluations, inspections & progress claims.",
          "Stakeholder communication & risk mitigation.",
        ],
        image: pmCapsImg,
        imageAlt: "Project manager tracking schedule",
      },
      {
        heading: "Tooling & Methodologies",
        content: [
          "Primavera P6 & MS Project scheduling",
          "Earned value management",
          "Agile & Last Planner System for rapid iterations",
        ],
        image: pmToolImg,
        imageAlt: "Split screen of scheduling tools",
        reverse: true,
      },
    ]}
  />
);

const ArchitecturalDesignPage = () => (
  <ServiceTemplate
    title="Architectural Design"
    intro="Innovative, functional spaces that elevate communities and exceed client aspirations."
    sections={[
      {
        heading: "Our Design Services",
        content: [
          "Planning permission packages & liaison with authorities.",
          "Building regulation drawings & structural calculations.",
          "3-D modelling & visualisation for stakeholder buy-in.",
          "MEP coordination drawings & energy-efficient solutions.",
        ],
        image: designSrvImg,
        imageAlt: "Modern 3-D building render",
      },
      {
        heading: "Why QS Experts Design?",
        content: [
          "Holistic approach balancing aesthetics, functionality & cost.",
          "Cross-disciplinary team ensures seamless handover to construction stage.",
          "BIM-based workflows reduce clashes and change orders by up to 40 %.",
        ],
        image: designBenImg,
        imageAlt: "Cutaway BIM model with clash highlights",
        reverse: true,
      },
    ]}
  />
);
/* ────────  about  ─────────────────────────────────────────── */
const AboutPage = () => (
  <ServiceTemplate
    title="About Us"
    intro="QS Experts is a multidisciplinary construction consultancy headquartered in Manchester."
    sections={[
      {
        heading: "Who We Are",
        content: `<p>Founded in 2012, QS Experts Ltd. began as a boutique cost consultancy serving local Northwest developers. 
                  Today we operate nationwide, combining chartered quantity surveyors, project managers, and RIBA architects 
                  under one roof.</p>`,
        image: qsCoreImg,
        imageAlt: "Team collaboration",
      },
      {
        heading: "Our Mission",
        content:
          "<p>To make construction predictable. We harness data-driven methodologies and collaborative BIM workflows to de-risk projects and unlock value for clients.</p>",
        image: pmCapsImg,
        imageAlt: "Mission board",
        reverse: true,
      },
      {
        heading: "Values",
        content: [
          "Integrity – every figure we publish can be traced and justified.",
          "Innovation – early adopters of 5D BIM and AI-assisted estimating.",
          "Collaboration – acting as an extension of your team, not just a supplier.",
          "Sustainability – prioritising low-carbon materials and circular-economy principles.",
        ],
        image: designBenImg,
        imageAlt: "Sustainability icons",
      },
    ]}
  />
);

/* ────────  contact  ───────────────────────────────────────── */
const ContactPage = () => (
  <Section
    id="contact"
    title="Get in Touch"
    subtitle="Complete the form or drop by our office – coffee’s on us."
  >
    <div className="grid gap-10 md:grid-cols-2">
      {/* left: details + map */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Manchester HQ</h3>
        <p>3 Hardman Square, Manchester M3 3EB, UK</p>
        <p>+44 161 768 5324 · hello@qsexperts.co.uk</p>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.568334309402!2d-2.2553887!3d53.4792515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1bee91a105b%3A0xbf0e1626e4a9387a!2s3%20Hardman%20Square%2C%20Manchester!5e0!3m2!1sen!2suk!4v1710000000000"
          width="100%"
          height="250"
          loading="lazy"
          className="rounded-lg shadow"
        ></iframe>
      </div>
      {/* right: form */}
      <QuoteForm />
    </div>
  </Section>
);

/* ─────  floating WhatsApp button  ──────────────── */
const WhatsappButton = () => {
  const phone = "447375097407"; // 👈 international format, no “+”
  const msg = "Hello, I’d like a project quote"; // default text

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 md:bottom-10 md:right-10
                 flex items-center justify-center w-14 h-14 rounded-full
                 bg-green-500 hover:bg-green-600 shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <img src="/src/assets/whatsapp.png" alt="" className="w-7 h-7" />
    </a>
  );
};

/* ────────  router  ───────────────────────────────────────── */
export default function App() {
  return (
    <Router>
      <GlobalStyles />
      <WhatsappButton />
      <Navbar />
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/quantity-surveying"
            element={<QuantitySurveyingPage />}
          />
          <Route
            path="/services/project-management"
            element={<ProjectManagementPage />}
          />
          <Route
            path="/services/architectural-design"
            element={<ArchitecturalDesignPage />}
          />
          <Route path="/services/outsourcing" element={<OutsourcingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="*"
            element={<Section title="404">Page Not Found</Section>}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
