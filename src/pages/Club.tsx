import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { roadToEurope, staff } from "@/data/club";

const Club = () => (
  <>
    <PageHero he="המועדון"
      eyebrow="The club"
      title={
        <>
          Born in the desert.
          <br />
          <span className="mt-1 inline-block bg-night px-3 pb-1 text-sand">Built for the ice.</span>
        </>
      }
      intro="A privately owned Israeli club with one plan: build the brand on a North American tour, win at home in Israel, bring European hockey to Israel, and take our place in a European league."
    />

    <section className="bg-night py-20" aria-labelledby="story-title">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <h2 id="story-title" className="text-3xl font-black text-ice-white sm:text-4xl">Our story</h2>
        <div className="space-y-5 text-lg leading-relaxed text-[#D9E3DC]">
          <p>
            Hockey has been played in Israel for decades. Israeli teams compete at IIHF World Championships every year, and a growing community of players,
            coaches and families keeps the game alive.
          </p>
          <p>
            What was missing was a club built to take Israeli hockey to the next level. Israel's top basketball and football clubs win at home and compete in
            Europe. Hockey deserves the same.
          </p>
          <p className="font-semibold text-ice-white">
            Sabra HC is that club. It grew out of Israel Selects, a team of Israeli and Jewish players that had already toured North America for three seasons.
            In 2026 it became Sabra HC: privately owned, built to be Israel's flagship team, and starting its road to Europe with a North American tour.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-ice-white py-20" aria-labelledby="crest-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <img src={crest} alt="The Sabra HC crest" className="mx-auto w-full max-w-md" />
        <div>
          <span className="tag-dark">The name and the crest</span>
          <h2 id="crest-title" className="mt-2 font-display text-3xl font-black uppercase leading-[0.9] text-night sm:text-5xl">Tough outside. Sweet inside.</h2>
          <div className="mt-6 space-y-4 text-lg text-[#3E4F44]">
            <p>
              A <strong className="text-night">sabra</strong> is the cactus fruit that is thorny on the outside and sweet on the inside, and the word for a
              native-born Israeli. It's how we play.
            </p>
            <p>The <strong className="text-night">lion</strong> stands for strength, its mane grown from the sabra cactus. The Star of David anchors the club to its home.</p>
            <ul className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                ["#0F3B2A", "Navy", "The desert night"],
                ["#E8B547", "Gold", "The sand"],
                ["#F3E9D2", "White", "The ice"],
              ].map(([c, n, m]) => (
                <li key={n} className="flex items-center gap-3 rounded-md border border-[#D9C9A4] bg-white p-3">
                  <span className="h-10 w-10 shrink-0 rounded-full border border-[#D9C9A4]" style={{ background: c }} aria-hidden="true" />
                  <span>
                    <span className="block font-display text-lg font-black uppercase text-night">{n}</span>
                    <span className="text-sm">{m}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-night py-20" aria-labelledby="pillars-title">
      <div className="container-site">
        <SectionHeading id="pillars-title" eyebrow="What we stand for" title="Three promises" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["A path home", "Jewish players from around the world can build a life in Israel through hockey, and play for a club that represents the country."],
            ["Built here", "Israel's best young players get a club to aim for at home, instead of leaving the country to keep playing at a high level."],
            ["Israel on the map", "Israel's team in front of crowds across North America now, European clubs on Israeli ice next, and an Israeli club carrying the flag in Europe."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-lg border border-line bg-night-2 p-8">
              <h3 className="text-3xl font-black text-sand">{t}</h3>
              <p className="mt-3 text-lg text-muted-text">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="road-to-europe" className="crowd relative scroll-mt-28 overflow-hidden border-y border-line py-24" aria-labelledby="road-title">
      <div className="container-site relative">
        <SectionHeading id="road-title" eyebrow="Our plan" title="The road to Europe" intro="These are goals, not results. Each step has a gate that must be met before the next one." />
        <ol className="relative ml-3 border-l-2 border-line">
          {roadToEurope.map((s, i) => (
            <li key={s.season} className="relative pb-12 pl-10 last:pb-0">
              <span
                className="absolute -left-[13px] top-1 h-6 w-6 rounded-full border-4 border-night-2"
                style={{ background: i < 2 ? "hsl(var(--sand))" : "hsl(var(--ice))" }}
                aria-hidden="true"
              />
              <p className={`tabular text-sm font-bold uppercase tracking-[0.2em] ${i < 2 ? "text-sand" : "text-ice"}`}>{s.season}</p>
              <h3 className="mt-1 text-3xl font-black text-ice-white">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-lg text-muted-text">{s.body}</p>
              <p className="mt-3 inline-block rounded-md bg-night px-4 py-2 text-sm text-ice-white">
                <span className="font-bold text-sand">Gate:</span> {s.gate}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="bg-night py-20" aria-labelledby="leadership-title">
      <div className="container-site">
        <SectionHeading id="leadership-title" eyebrow="Leadership" title="The people behind the club" />
        {staff.length === 0 ? (
          <p className="text-lg text-muted-text">Leadership profiles are coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="rounded-lg border border-line bg-night-2 p-6">
                <h3 className="text-2xl font-black text-ice-white">{s.name}</h3>
                <p className="text-sand">{s.role}</p>
                {s.bio && <p className="mt-2 text-muted-text">{s.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

    <section className="bg-sand py-20">
      <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-4xl font-black text-night sm:text-5xl">We're just getting started.</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/pride" className="btn-dark">
            Join the Pride
          </Link>
          <Link to="/partners" className="btn border-2 border-night text-night hover:bg-night hover:text-ice-white">
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Club;
