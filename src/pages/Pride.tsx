import { Link } from "react-router-dom";
import { Shirt, Gift, Tv, Percent, Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SignupForm from "@/components/SignupForm";

const perks = [
  { icon: Shirt, title: "Founders Edition jersey", body: "A limited-run jersey made only for founding members." },
  { icon: Gift, title: "Founders merch pack", body: "Scarf, hat and enamel pin." },
  { icon: Tv, title: "Digital access", body: "Game streams, replays and behind-the-scenes content." },
  { icon: Percent, title: "Member discount", body: "A lasting discount on Sabra HC merchandise." },
  { icon: Award, title: "Founders Wall", body: "Your name on the Founders Wall, for good." },
];

const Pride = () => (
  <>
    <PageHero
      eyebrow="Supporter membership"
      title="Join the Pride"
      intro="Become a founding member of Israel's flagship hockey club and be part of every first."
      variant="desert"
    />

    <section className="bg-night py-20" aria-labelledby="what-title">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="what-title" eyebrow="What it is" title="Founding membership" />
          <div className="space-y-4 text-lg text-[#C9D6E6]">
            <p>
              The Pride is our supporter membership. Founding members help fund the club's first seasons and get first access to tickets, news and members-only
              moments.
            </p>
            <p className="rounded-md border border-line bg-night-2 p-4 text-base text-muted-text">
              A membership is a supporter package. It is not ownership of the club or an investment. For ownership enquiries, see{" "}
              <Link to="/invest" className="text-ice underline">
                Ownership & Investment
              </Link>
              .
            </p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {perks.map((p) => (
            <li key={p.title} className="rounded-lg border border-line bg-night-2 p-6">
              <p.icon className="h-8 w-8 text-sand" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-3 text-2xl font-black text-ice-white">{p.title}</h3>
              <p className="mt-1 text-muted-text">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-sand py-20" aria-labelledby="early-title">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 id="early-title" className="text-6xl font-black leading-[0.9] text-night sm:text-7xl">Get early access</h2>
          <p className="mt-4 max-w-md text-lg font-medium text-night/80">
            Founding memberships open soon. Sign up and we'll send you the details and price before anyone else. No commitment.
          </p>
        </div>
        <div className="rounded-lg bg-night p-6 sm:p-8">
          <SignupForm
            source="pride"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "country", label: "Country" },
              { name: "jersey_size", label: "Jersey size", type: "select", options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
            ]}
            submitLabel="Count me in"
            successTitle="Welcome to the Pride"
            successBody="We'll email you as soon as founding memberships open."
          />
        </div>
      </div>
    </section>
  </>
);

export default Pride;
