import { useState } from "react";
import PageHero from "@/components/PageHero";
import { CalendarArt } from "@/components/motion";
import GameCard from "@/components/GameCard";
import SignupForm from "@/components/SignupForm";
import { club, games, type Competition } from "@/data/club";
import { seasonRecord } from "@/lib/games";

const tabs: ("All" | Competition)[] = ["All", "INHL", "Sabra Series", "International", "Continental Cup"];

const Schedule = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = games.filter((g) => tab === "All" || g.competition === tab).sort((a, b) => a.date.localeCompare(b.date));
  const rec = seasonRecord();

  return (
    <>
      <PageHero cam="CAM 4 · Season calendar" status="Schedule TBA" tone="sand" art={<CalendarArt />}
        eyebrow={`${club.season} season`}
        title="Schedule & Results"
        intro={`The ${club.leagueShort} regular season, the Sabra Series, and international games as they are confirmed. All times are Israel time.`}
      />
      <section className="bg-night py-16" aria-label="Games">
        <div className="container-site">
          {games.length === 0 ? (
            <div className="grid items-center gap-8 rounded-lg border border-line bg-night-2 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <p className="eyebrow">Coming soon</p>
                <p className="mt-2 font-display text-5xl font-black uppercase text-ice-white">The schedule is being finalised</p>
                <p className="mt-3 text-muted-text">
                  We'll publish dates, opponents and venues here first. Leave your email and we'll tell you the moment it's out.
                </p>
              </div>
              <SignupForm
                source="tickets"
                idPrefix="schedule-notify"
                fields={[{ name: "email", label: "Email", type: "email", required: true, full: true }]}
                submitLabel="Notify me"
                successTitle="You'll hear first"
              />
            </div>
          ) : (
            <>
              {rec.played > 0 && (
                <dl className="tabular mb-10 grid grid-cols-3 gap-4 sm:grid-cols-5">
                  {[
                    ["W", rec.w],
                    ["L", rec.l],
                    ["OTL", rec.otl],
                    ["GF", rec.gf],
                    ["GA", rec.ga],
                  ].map(([k, v]) => (
                    <div key={k as string} className="rounded-lg border border-line bg-night-2 p-4 text-center">
                      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted-text">{k}</dt>
                      <dd className="font-display text-5xl font-black text-ice-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by competition">
                {tabs.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={tab === t ? "chip-on" : "chip-off"}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid gap-4">
                {list.length ? list.map((g) => <GameCard key={g.id} game={g} />) : <p className="text-muted-text">No games in this competition yet.</p>}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Schedule;
