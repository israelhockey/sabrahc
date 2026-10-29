import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import { roadToEurope, staff } from "@/data/club";
import Community from "@/components/Community";
import BgVideo from "@/components/BgVideo";
import PhotoStrip from "@/components/PhotoStrip";

const chapters = [
  {
    year: "Decades",
    title: "Hockey in Israel",
    body: "Ice hockey has been played in Israel for decades. The national teams compete at IIHF World Championships every year, and a small, stubborn community of players, coaches and families keeps the game alive, often far from the spotlight.",
  },
  {
    year: "2023–26",
    title: "Israel Selects",
    body: "For three seasons, Israel Selects brought players from Israel Elite Hockey League teams and Israel's national team together to play in North America, including two marquee games at UBS Arena in New York. Those trips showed how much it means to a community when Israel's team comes to town.",
  },
  {
    year: "2026",
    title: "Sabra HC is founded",
    body: "The people behind the Selects founded Sabra HC to take the next step: a real club, with a name, a home and a plan. From the 2026–27 season the Selects play as Sabra HC.",
  },
  {
    year: "2026–27",
    title: "On tour",
    body: "Our players live in North America, and so do many of the fans and partners who want to back Israeli hockey. So we start on the road, city by city, building the following, the partners and the community nights before we bring the club home.",
  },
];

/** The Club page: why we exist, where we come from, and where we're going. */
const Club = () => (
  <>
    {/* opening statement over the brand film */}
    <section aria-labelledby="club-title" className="relative overflow-hidden bg-night-deep">
      <div aria-hidden="true" className="absolute inset-0">
        <BgVideo name="born-in-the-desert" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/60 to-night-deep/20" />
      </div>
      <div className="container-site relative flex min-h-[560px] flex-col justify-end pb-16 pt-28 lg:min-h-[640px]">
        <p className="label text-sm text-sand">
          The club · <span lang="he">המועדון</span>
        </p>
        <h1 id="club-title" className="mt-3 max-w-5xl font-display text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">
          A hockey club with a bigger job.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#D9E3DC] sm:text-2xl">
          Sabra HC exists for two reasons: to grow Israeli hockey, and to bring Jewish communities together around it.
        </p>
      </div>
    </section>

    {/* the mission */}
    <section className="bg-ice-white py-20 text-night lg:py-28" aria-labelledby="mission-title">
      <div className="container-site">
        <p className="label text-xs text-sand-dark">
          Our mission · <span lang="he" className="normal-case tracking-normal">המשימה שלנו</span>
        </p>
        <h2 id="mission-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
          Two goals. One team.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded border border-[#D9C9A4] bg-[#D9C9A4] lg:grid-cols-2">
          {[
            {
              n: "01",
              t: "Grow Israeli hockey",
              he: "לגדל את ההוקי הישראלי",
              b: "Israel's top basketball and football clubs win at home and compete in Europe. Hockey has never had a club built to do the same. We're building it: a club Israel's best young players can aim for instead of leaving the country to keep playing, a path home for Jewish players from around the world, and an Israeli team that carries the flag into European competition.",
            },
            {
              n: "02",
              t: "Bring communities together",
              he: "לחבר קהילות",
              b: "A Sabra HC game is a gathering. Synagogues, JCCs, schools and families fill the stands together, kids meet the players, and there's Shabbat and celebration around the weekend. Every city we visit gets a night that's about more than hockey: being together, and being proud of Israel.",
            },
          ].map((m) => (
            <div key={m.n} className="bg-[#FBF6EA] p-8 sm:p-10">
              <p className="tabular font-display text-6xl font-black leading-none text-sand">{m.n}</p>
              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-tight">{m.t}</h3>
              <p lang="he" className="mt-1 text-lg font-bold text-sand-dark">
                {m.he}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#3E4F44]">{m.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* the story, chapter by chapter */}
    <section className="bg-night py-20 lg:py-28" aria-labelledby="story-title">
      <div className="container-site">
        <p className="label text-xs text-sand">
          Our story · <span lang="he">הסיפור שלנו</span>
        </p>
        <h2 id="story-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
          How we got here
        </h2>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {chapters.map((c, i) => (
            <li key={c.title} className="grid gap-4 py-10 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
              <p className="tabular font-display text-2xl font-black text-sand">{c.year}</p>
              <h3 className="font-display text-3xl font-black uppercase leading-tight">
                <span className="tabular mr-3 text-base text-muted-text">0{i + 1}</span>
                {c.title}
              </h3>
              <p className="text-lg leading-relaxed text-[#D9E3DC]">{c.body}</p>
            </li>
          ))}
        </ol>
        <PhotoStrip className="mt-12" ids={["p122", "p020", "p027", "p143"]} caption="Israel Selects on tour, 2023–26: fans, families, kids and the team." />
        <blockquote className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-display text-3xl font-black uppercase leading-tight sm:text-5xl">
            We believe that wherever Israeli hockey shows up, <span className="text-sand">the community shows up too.</span>
          </p>
        </blockquote>
      </div>
    </section>

    {/* the community promise, in practice */}
    <Community />

    {/* where we're going */}
    <section id="road-to-europe" className="scroll-mt-28 bg-night-deep py-20 lg:py-28" aria-labelledby="road-title">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-xs text-sand">
              Where we're going · <span lang="he">לאן אנחנו הולכים</span>
            </p>
            <h2 id="road-title" className="mt-2 font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
              Home, then Europe
            </h2>
          </div>
          <p className="max-w-md text-muted-text">These are goals, not results. Each step has a gate we have to clear before the next one.</p>
        </div>
        <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {roadToEurope.map((s, i) => (
            <li key={s.season} className={`flex flex-col rounded border p-6 ${i === 0 ? "border-sand bg-sand text-night" : "border-line bg-night"}`}>
              <p className={`label text-xs ${i === 0 ? "" : "text-sand"}`}>
                {s.season}
                {i === 0 ? " · Now" : ""}
              </p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight">{s.title}</h3>
              <p className={`mt-3 ${i === 0 ? "font-medium" : "text-[#D9E3DC]"}`}>{s.body}</p>
              <p className={`mt-auto border-t pt-3 text-sm ${i === 0 ? "border-night/20" : "border-line text-muted-text"}`}>
                <span className="font-bold">Gate:</span> {s.gate}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* the name and the crest */}
    <section className="bg-ice-white py-20" aria-labelledby="crest-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <img src={crest} alt="The Sabra HC crest" className="mx-auto w-full max-w-md" />
        <div>
          <p className="label text-xs text-sand-dark">
            The name and the crest · <span lang="he" className="normal-case tracking-normal">השם והסמל</span>
          </p>
          <h2 id="crest-title" className="mt-2 font-display text-3xl font-black uppercase leading-[0.9] text-night sm:text-5xl">
            Tough outside. Sweet inside.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-[#3E4F44]">
            <p>
              A <strong className="text-night">sabra</strong> is the cactus fruit that's thorny on the outside and sweet on the inside, and the word for a native-born
              Israeli. It's how we play, and how we want every community we visit to feel about us.
            </p>
            <p>The <strong className="text-night">lion</strong> stands for strength, its mane grown from the sabra cactus. The Star of David anchors the club to its home.</p>
            <ul className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                ["#0F3B2A", "Green", "The sabra cactus"],
                ["#E8B547", "Gold", "The desert and the lion"],
                ["#F3E9D2", "Cream", "The ice"],
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

    {staff.length > 0 && (
      <section className="bg-night py-20" aria-labelledby="leadership-title">
        <div className="container-site">
          <h2 id="leadership-title" className="mb-8 font-display text-4xl font-black uppercase">
            The people behind the club
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="rounded border border-line bg-night-2 p-6">
                <h3 className="font-display text-2xl font-black uppercase">{s.name}</h3>
                <p className="text-sand">{s.role}</p>
                {s.bio && <p className="mt-2 text-muted-text">{s.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="bg-sand py-20 text-night">
      <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Be part of it.</h2>
          <p className="mt-2 max-w-xl text-lg font-medium">Join the Pride, bring us to your city, or help build the club as a partner.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/pride" className="btn-dark">
            Join the Pride
          </Link>
          <Link to="/host" className="btn border-2 border-night text-night hover:bg-night hover:text-sand">
            Bring us to your city
          </Link>
          <Link to="/partners" className="btn border-2 border-night text-night hover:bg-night hover:text-sand">
            Partner with us
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Club;
