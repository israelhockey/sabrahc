import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";
import SignupForm from "@/components/SignupForm";
import { TourStops } from "@/components/tour";
import { upcomingGames } from "@/lib/games";

const faqs = [
  { q: "How much are tickets?", a: "Each host rink sets its own prices. We list them with every weekend series as soon as they're confirmed." },
  { q: "Can our synagogue, school or JCC come as a group?", a: "Yes, and we'd love that. Community nights are what the tour is built around. Fill in the group form and we'll plan it with you." },
  { q: "Can kids come?", a: "Absolutely. Hockey is a family game, and most stops include a meet-and-greet with the players." },
  { q: "Can the tour come to my city?", a: "Yes. Leave your details on the Bring us to your city page (sabrahc.com/host) and we'll call you." },
  { q: "Is the arena accessible?", a: "Contact us before the game and we'll make sure you have what you need." },
];

const Tickets = () => {
  const home = upcomingGames();
  return (
    <>
      <PageHero he="כרטיסים" eyebrow="Game nights" title="Tickets" intro="Fast, loud and close to the glass. Catch Sabra HC when the tour comes to your city." />

      <section className="bg-night py-16" aria-labelledby="upcoming-title">
        <div className="container-site">
          <SectionHeading id="upcoming-title" eyebrow="On sale" title="Upcoming games" />
          {home.length ? (
            <div className="grid gap-4">
              {home.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          ) : (
            <div className="grid items-center gap-8 rounded-lg border border-line bg-night-2 p-8 lg:grid-cols-2">
              <p className="font-display text-3xl font-black uppercase text-ice-white">The next weekend series is being booked</p>
              <SignupForm
                source="tickets"
                idPrefix="tickets-notify"
                fields={[{ name: "email", label: "Email", type: "email", required: true, full: true }]}
                submitLabel="Tell me when"
                successTitle="You're on the list"
              />
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-night-deep py-20" aria-labelledby="stops-title">
        <div className="container-site">
          <SectionHeading id="stops-title" eyebrow="Where we play" title="The tour" intro="We play weekend series in cities across North America. Ticket details for each stop are posted as soon as it's booked." />
          <TourStops wide />
        </div>
      </section>

      <section id="groups" className="scroll-mt-28 bg-night py-20" aria-labelledby="groups-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="groups-title" eyebrow="Community nights & groups" title="Bring your community" intro="Synagogues, JCCs, schools, youth groups and companies: we'll set up a group night with seats together and time with the players afterwards. Tell us what you're planning." />
          </div>
          <SignupForm
            source="tickets"
            idPrefix="groups"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "group_size", label: "Group size", type: "number" },
              { name: "message", label: "What are you planning?", type: "textarea" },
            ]}
            submitLabel="Send request"
            successTitle="Request received"
            successBody="We'll get back to you within a couple of days."
          />
        </div>
      </section>

      <section className="border-t border-line bg-night-2 py-20" aria-labelledby="faq-title">
        <div className="container-site max-w-4xl">
          <h2 id="faq-title" className="text-3xl font-black text-ice-white">Good to know</h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-xl font-bold uppercase text-ice-white">{f.q}</dt>
                <dd className="mt-1 text-muted-text">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};

export default Tickets;
