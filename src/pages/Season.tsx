import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { EpisodeRow, FirstsBoard } from "@/components/sections";
import { TourMap, TourStops } from "@/components/tour";
import SignupForm from "@/components/SignupForm";
import SectionHeading from "@/components/SectionHeading";
import { club } from "@/data/club";

const Season = () => (
  <>
    <PageHero he="הסיור בצפון אמריקה"
      eyebrow={`${club.season} · ${club.leagueShort}`}
      title={
        <>
          The North
          <br />
          American <span className="mt-1 inline-block bg-night px-3 pb-1 text-sand">Tour</span>
        </>
      }
      intro="Israel's flagship team on the road. Each weekend series is a game and a community event in a city with a big Jewish community. Next season, the road leads home to Israel."
    />

    <section className="bg-night py-16" aria-labelledby="stops-title">
      <div className="container-site">
        <SectionHeading id="stops-title" eyebrow="Weekend by weekend" title="Tour stops" />
        <div className="mb-8 overflow-hidden rounded border border-line">
          <div className="panel-head bg-night-2">
            <span>Cities on our list</span>
            <span className="text-sand">Dates announced as they're booked</span>
          </div>
          <TourMap light={false} />
        </div>
        <TourStops wide />
      </div>
    </section>

    <section className="border-t border-line bg-night-deep py-16" aria-labelledby="weekend-title">
      <div className="container-site grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <SectionHeading id="weekend-title" eyebrow="What a tour stop looks like" title="Every weekend is an event" />
        </div>
        {[
          ["The games", "Two games against the local MHL team or an exhibition opponent."],
          ["The community", "A local federation, JCC or Hillel fills the stands and brings families."],
          ["The kids", "A clinic or meet-and-greet with the players on game day."],
          ["The partner", "A local business presents the weekend: \"Sabra HC in your city, presented by…\""],
        ].map(([t, b]) => (
          <div key={t} className="border-t-4 border-sand bg-night p-5">
            <h3 className="font-display text-2xl font-black uppercase">{t}</h3>
            <p className="mt-2 text-muted-text">{b}</p>
          </div>
        ))}
        <div className="lg:col-span-4">
          <Link to="/partners#city-partner" className="btn-primary">
            Host a weekend in your city
          </Link>
        </div>
      </div>
    </section>

    <EpisodeRow />
    <FirstsBoard />

    <section className="border-t border-line bg-night-2 py-16" aria-labelledby="tour-alerts">
      <div className="container-site grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="tag-live">Tour alerts</span>
          <h2 id="tour-alerts" className="mt-2 font-display text-3xl font-black uppercase leading-[0.9] sm:text-4xl">
            Know when we're coming
          </h2>
          <p className="mt-3 text-lg text-muted-text">
            One email when a new stop is booked, and when a new episode drops. Want more? <Link to="/pride" className="text-ice underline">Join the Pride</Link>.
          </p>
        </div>
        <SignupForm
          source="newsletter"
          idPrefix="tour"
          fields={[
            { name: "email", label: "Email", type: "email", required: true },
            { name: "country", label: "Your city" },
          ]}
          submitLabel="Notify me"
          successTitle="You're on the list"
          successBody="We'll email you when the tour comes near you."
        />
      </div>
    </section>
  </>
);

export default Season;
