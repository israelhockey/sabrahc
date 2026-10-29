import { Link } from "react-router-dom";
import { Users, Star, Flame, Flag } from "lucide-react";
import { SectionTitle } from "./broadcast";

const pillars = [
  { icon: Users, title: "Community night", he: "ערב קהילה", body: "Synagogues, JCCs, schools and youth groups in the stands together, cheering one team." },
  { icon: Star, title: "Meet the players", he: "פגשו את השחקנים", body: "Autographs, photos and time with the players for the kids after the game." },
  { icon: Flame, title: "Shabbat & celebrations", he: "שבת וחגים", body: "Shabbat dinners, holiday events and gatherings around the weekend, hosted with the local community." },
  { icon: Flag, title: "Israel at the rink", he: "ישראל ביציע", body: "The flag, the songs, Israeli music and food. A piece of home, wherever we play." },
];

/**
 * The club's community promise: every tour stop is a night that brings the local Jewish community together.
 * Used on the home page and the club page.
 */
const Community = ({ className = "bg-night-deep" }: { className?: string }) => (
  <section aria-labelledby="community-title" className={`crowd relative py-20 lg:py-24 ${className}`}>
    <div className="container-site relative">
      <SectionTitle
        id="community-title"
        tag="More than a game"
        he="ביחד"
        title="Bringing the community together"
        intro="Every stop on the tour is a community event. We work with local synagogues, JCCs, schools, Hillels and businesses to bring Jewish families together for a night they'll remember."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, he, body }) => (
          <li key={title} className="rounded border border-line bg-night p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-night">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-black uppercase leading-tight">{title}</h3>
            <p lang="he" className="mt-1 text-sm font-bold text-sand">
              {he}
            </p>
            <p className="mt-2 text-[#D9E3DC]">{body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-start gap-4 rounded bg-sand p-6 text-night sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl font-display text-xl font-black uppercase leading-tight sm:text-2xl">Bring your synagogue, school or community to a game</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/tickets#groups" className="btn-dark">
            Plan a community night
          </Link>
          <Link to="/partners#city-partner" className="btn border-2 border-night text-night hover:bg-night hover:text-sand">
            Partner with us
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Community;
