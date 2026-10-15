import { Link } from "react-router-dom";
import { Mail, Handshake, Megaphone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SignupForm from "@/components/SignupForm";
import { club } from "@/data/club";

const Contact = () => (
  <>
    <PageHero cam="CAM 4 · Bench door" eyebrow="Get in touch" title="Contact" intro="Questions, partnerships, media or try-outs. We read everything." />

    <section className="bg-night py-16">
      <div className="container-site grid gap-6 md:grid-cols-3">
        <a href={`mailto:${club.email}`} className="card-lift rounded-lg border border-line bg-night-2 p-7">
          <Mail className="h-8 w-8 text-sand" aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-black text-ice-white">General</h2>
          <p className="text-ice">{club.email}</p>
        </a>
        <Link to="/partners" className="card-lift rounded-lg border border-line bg-night-2 p-7">
          <Handshake className="h-8 w-8 text-sand" aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-black text-ice-white">Partners</h2>
          <p className="text-muted-text">Partnership enquiry form</p>
        </Link>
        <a href={`mailto:${club.email}?subject=Media%20enquiry`} className="card-lift rounded-lg border border-line bg-night-2 p-7">
          <Megaphone className="h-8 w-8 text-sand" aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-black text-ice-white">Media</h2>
          <p className="text-muted-text">Press and interview requests</p>
        </a>
      </div>
    </section>

    <section className="border-t border-line bg-night py-20" aria-labelledby="message-title">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading id="message-title" eyebrow="Message us" title="Send a message" />
        <SignupForm
          source="contact"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
          submitLabel="Send message"
          successTitle="Message sent"
          successBody="Thanks for reaching out. We'll reply soon."
        />
      </div>
    </section>

    <section id="tryouts" className="scroll-mt-28 border-t border-line bg-night-2 py-20" aria-labelledby="tryouts-title">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading
          id="tryouts-title"
          eyebrow="Players"
          title="Try-outs"
          intro="Israeli players, players eligible to make aliyah, and international players: tell us about yourself and send your highlights."
        />
        <SignupForm
          source="tryout"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "birth_year", label: "Birth year", type: "number", required: true },
            { name: "position", label: "Position", type: "select", options: ["Forward", "Defence", "Goalie"], required: true },
            { name: "current_team", label: "Current team and league", full: true },
            { name: "status", label: "Status", type: "select", options: ["Israeli citizen", "Eligible to make aliyah", "Other"], required: true },
            { name: "country", label: "Country you live in" },
            { name: "elite_prospects", label: "EliteProspects link", type: "url" },
            { name: "highlights", label: "Highlight video link", type: "url" },
            { name: "message", label: "Anything else?", type: "textarea" },
          ]}
          submitLabel="Apply"
          successTitle="Application received"
          successBody="Our hockey staff review every application. We'll be in touch if there's a fit."
        />
      </div>
    </section>
  </>
);

export default Contact;
