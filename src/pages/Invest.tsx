import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SignupForm from "@/components/SignupForm";

const Invest = () => (
  <>
    <PageHero
      eyebrow="Ownership & investment"
      title="Own a piece of Israel's club"
      intro="Sabra HC LLC is raising a founding round from a small group of partners who want to build Israel's flagship hockey club."
      cam="CAM 5 · Boardroom over the rink"
    />
    <section className="bg-night py-20">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8">
          {[
            ["The plan", <>Win at home, bring European hockey to Israel, and join a European league. <Link to="/club#road-to-europe" className="text-ice underline">See the road to Europe</Link>.</>],
            ["The people", "A founding group with deep roots in Israeli and international hockey."],
            ["The structure", "A privately owned US LLC, with a three-season founding commitment from owners."],
          ].map(([t, b]) => (
            <div key={t as string} className="border-t-4 border-sand pt-4">
              <h2 className="text-4xl font-black text-ice-white">{t}</h2>
              <p className="mt-2 text-lg text-muted-text">{b}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-line bg-night-2 p-6 sm:p-8">
          <h2 className="text-4xl font-black text-ice-white">Request the investor pack</h2>
          <p className="mb-6 mt-2 text-muted-text">We'll send the presentation and arrange a call.</p>
          <SignupForm
            source="investor"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "country", label: "Country" },
              { name: "heard_from", label: "How did you hear about us?", full: true },
              { name: "message", label: "Message", type: "textarea" },
            ]}
            submitLabel="Request the pack"
            successTitle="Thank you"
            successBody="A member of the founding team will be in touch shortly."
          />
        </div>
      </div>
      <div className="container-site mt-16">
        <p className="border-t border-line pt-6 text-sm text-muted-text">
          This page is for information only and is not an offer to sell, or a solicitation of an offer to buy, any securities.
        </p>
      </div>
    </section>
  </>
);

export default Invest;
