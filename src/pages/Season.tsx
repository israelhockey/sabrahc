import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { TimelineArt } from "@/components/motion";
import { EpisodeRow, FirstsBoard } from "@/components/sections";
import SignupForm from "@/components/SignupForm";
import { club } from "@/data/club";

const Season = () => (
  <>
    <PageHero cam="CAM 1 · Edit suite" status="In production" tone="live" art={<TimelineArt />}
      eyebrow={`Original series · ${club.season}`}
      title={
        <>
          The Founding
          <br />
          <span className="mt-1 inline-block bg-night px-3 pb-1 text-sand">Season</span>
        </>
      }
      intro="The first year of an Israeli hockey club, filmed from the inside: building the team, designing the uniform, try-outs, and Game 001."
    />
    <EpisodeRow heading={false} />
    <FirstsBoard />
    <section className="border-t border-line bg-night-2 py-16" aria-labelledby="ep-alerts">
      <div className="container-site grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="tag-live">Episode alerts</span>
          <h2 id="ep-alerts" className="mt-2 font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl">
            Get every episode first
          </h2>
          <p className="mt-3 text-lg text-muted-text">
            One email when a new episode drops. Want more? <Link to="/pride" className="text-ice underline">Join the Pride</Link> for behind-the-scenes access.
          </p>
        </div>
        <SignupForm
          source="newsletter"
          idPrefix="episodes"
          fields={[{ name: "email", label: "Email", type: "email", required: true, full: true }]}
          submitLabel="Notify me"
          successTitle="You're on the list"
          successBody="We'll email you when the next episode is out."
        />
      </div>
    </section>
  </>
);

export default Season;
