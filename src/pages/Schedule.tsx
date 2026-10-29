import PageHero from "@/components/PageHero";
import { CalendarArt } from "@/components/motion";
import GameCard from "@/components/GameCard";
import SignupForm from "@/components/SignupForm";
import { GameRecap, TourStops } from "@/components/tour";
import { club } from "@/data/club";
import { finalGames, upcomingGames, seasonRecord, skaterStats, goalieStats } from "@/lib/games";

const Schedule = () => {
  const upcoming = upcomingGames();
  const results = finalGames();
  const rec = seasonRecord();
  const skaters = skaterStats();
  const goalies = goalieStats();

  return (
    <>
      <PageHero
        cam="CAM 4 · Tour calendar"
        status="Weekend 2 being booked"
        tone="sand"
        art={<CalendarArt />}
        eyebrow={`${club.seasonName} · ${club.season}`}
        title="Schedule & Results"
        intro={`Every weekend series on the tour, with results and stats from the official ${club.leagueShort} game sheets. Times are local to each city.`}
      />

      <section className="bg-night py-16" aria-labelledby="record-title">
        <div className="container-site">
          <h2 id="record-title" className="sr-only">Season record</h2>
          <dl className="tabular grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-6">
            {[
              ["GP", rec.played],
              ["W", rec.w],
              ["L", rec.l + rec.otl],
              ["GF", rec.gf],
              ["GA", rec.ga],
              ["Diff", `${rec.gf - rec.ga >= 0 ? "+" : ""}${rec.gf - rec.ga}`],
            ].map(([k, v]) => (
              <div key={k as string} className="bg-night-2 p-4 text-center">
                <dd className="font-display text-5xl font-black leading-none text-ice-white">{v}</dd>
                <dt className="label mt-1 text-xs text-ice">{k}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted-text">
            Official league stats:{" "}
            <a href={club.statsUrl} target="_blank" rel="noreferrer" className="text-ice underline hover:text-sand">
              Mountain Hockey League
            </a>
            . The October games were played under the team's former name, {club.formerName}.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-night-deep py-16" aria-labelledby="stops-title">
        <div className="container-site">
          <h2 id="stops-title" className="mb-6 font-display text-5xl font-black uppercase">Tour stops</h2>
          <TourStops wide />
        </div>
      </section>

      <section className="border-t border-line bg-night py-16" aria-labelledby="games-title">
        <div className="container-site">
          <h2 id="games-title" className="mb-6 font-display text-5xl font-black uppercase">Games</h2>
          {upcoming.length > 0 && (
            <div className="mb-8 grid gap-4">
              {upcoming.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          )}
          {upcoming.length === 0 && (
            <div className="mb-8 grid items-center gap-6 border border-line bg-night-2 p-6 lg:grid-cols-2 lg:p-8">
              <div>
                <p className="label text-sm text-sand">Next weekend series</p>
                <p className="mt-1 font-display text-4xl font-black uppercase">Dates coming soon</p>
                <p className="mt-2 text-muted-text">We announce each stop as soon as it's booked. Leave your email and we'll tell you when the tour comes near you.</p>
              </div>
              <SignupForm
                source="tickets"
                idPrefix="schedule-notify"
                fields={[
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "country", label: "Your city" },
                ]}
                submitLabel="Tell me"
                successTitle="You'll hear first"
              />
            </div>
          )}
          <div className="grid gap-4 lg:grid-cols-2">
            {results.map((g) => (
              <GameRecap key={g.id} game={g} />
            ))}
          </div>
        </div>
      </section>

      {skaters.length > 0 && (
        <section className="border-t border-line bg-night-deep py-16" aria-labelledby="stats-title">
          <div className="container-site grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 id="stats-title" className="mb-4 font-display text-5xl font-black uppercase">Skaters</h2>
              <div className="overflow-x-auto border border-line">
                <table className="tabular w-full text-left text-sm">
                  <thead className="label bg-night-2 text-xs text-muted-text">
                    <tr>
                      <th className="px-3 py-2.5">#</th>
                      <th className="px-3 py-2.5">Player</th>
                      <th className="px-3 py-2.5 text-right">GP</th>
                      <th className="px-3 py-2.5 text-right">G</th>
                      <th className="px-3 py-2.5 text-right">A</th>
                      <th className="px-3 py-2.5 text-right">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skaters.map((s) => (
                      <tr key={s.name} className="border-t border-line">
                        <td className="px-3 py-2 text-muted-text">{s.number ?? "–"}</td>
                        <td className="px-3 py-2 font-semibold text-ice-white">{s.name}</td>
                        <td className="px-3 py-2 text-right">{s.gp}</td>
                        <td className="px-3 py-2 text-right">{s.g}</td>
                        <td className="px-3 py-2 text-right">{s.a}</td>
                        <td className="px-3 py-2 text-right font-bold text-sand">{s.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-display text-5xl font-black uppercase">Goalies</h2>
              <div className="overflow-x-auto border border-line">
                <table className="tabular w-full text-left text-sm">
                  <thead className="label bg-night-2 text-xs text-muted-text">
                    <tr>
                      <th className="px-3 py-2.5">Goalie</th>
                      <th className="px-3 py-2.5 text-right">GP</th>
                      <th className="px-3 py-2.5 text-right">W–L</th>
                      <th className="px-3 py-2.5 text-right">SV</th>
                      <th className="px-3 py-2.5 text-right">SV%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goalies.map((g) => (
                      <tr key={g.name} className="border-t border-line">
                        <td className="px-3 py-2 font-semibold text-ice-white">{g.name}</td>
                        <td className="px-3 py-2 text-right">{g.gp}</td>
                        <td className="px-3 py-2 text-right">{g.w}–{g.l}</td>
                        <td className="px-3 py-2 text-right">{g.saves}/{g.sa}</td>
                        <td className="px-3 py-2 text-right font-bold text-sand">{g.svPct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Schedule;
