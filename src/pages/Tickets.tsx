import { MapPin, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";
import SignupForm from "@/components/SignupForm";
import { arenas } from "@/data/club";
import { upcomingGames } from "@/lib/games";

const faqs = [
  { q: "How much are tickets?", a: "Prices start from ₪50 and are listed with each game when tickets go on sale." },
  { q: "Can kids come?", a: "Absolutely. Hockey is a family game, and ticket options are listed with each game when sales open." },
  { q: "What should I bring?", a: "A warm layer. It's an ice rink, and it gets cold even in the Israeli summer." },
  { q: "Is the arena accessible?", a: "Contact us before the game and we'll make sure you have what you need." },
];

const Tickets = () => {
  const home = upcomingGames().filter((g) => g.home);
  return (
    <>
      <PageHero cam="CAM 3 · Crowd behind the glass" eyebrow="Game nights" title="Tickets" intro="Fast, loud and close to the glass. Get your seats for Sabra HC home games." />

      <section className="bg-night py-16" aria-labelledby="upcoming-title">
        <div className="container-site">
          <SectionHeading id="upcoming-title" eyebrow="On sale" title="Upcoming home games" />
          {home.length ? (
            <div className="grid gap-4">
              {home.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          ) : (
            <div className="grid items-center gap-8 rounded-lg border border-line bg-night-2 p-8 lg:grid-cols-2">
              <p className="font-display text-4xl font-black uppercase text-ice-white">Tickets go on sale with the schedule announcement</p>
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

      <section className="bg-ice-white py-20" aria-labelledby="arenas-title">
        <div className="container-site">
          <SectionHeading id="arenas-title" tone="light" eyebrow="Where we play" title="Our arenas" />
          <div className="grid gap-6 md:grid-cols-2">
            {arenas.map((a) => (
              <div key={a.id} className="rounded-lg border border-[#D5DEE6] bg-white p-8">
                <h3 className="text-4xl font-black text-night">{a.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-[#3B4A63]">
                  <MapPin className="h-5 w-5 text-sand-dark" /> {a.city}
                </p>
                <p className="mt-1 flex items-center gap-2 text-[#3B4A63]">
                  <Users className="h-5 w-5 text-sand-dark" /> {a.capacity}
                </p>
                <p className="mt-4 text-lg text-[#3B4A63]">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night py-20" aria-labelledby="groups-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="groups-title" eyebrow="Groups & companies" title="Bring the crew" intro="Group tickets, company nights, birthdays and school trips. Tell us what you're planning." />
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
          <h2 id="faq-title" className="text-5xl font-black text-ice-white">Good to know</h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-2xl font-bold uppercase text-ice-white">{f.q}</dt>
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
