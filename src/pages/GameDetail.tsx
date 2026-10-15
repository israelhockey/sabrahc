import { Link, useParams } from "react-router-dom";
import { MapPin, Ticket } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import ContourField from "@/components/ContourField";
import { games } from "@/data/club";
import { arenaFor, formatGameDate, formatGameTime } from "@/lib/games";
import NotFound from "./NotFound";

const GameDetail = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  if (!game) return <NotFound />;
  const arena = arenaFor(game);
  const final = game.status === "final";

  return (
    <>
      <section className="relative overflow-hidden bg-night pb-16 pt-[160px] lg:pt-[196px]">
        <ContourField variant="transition" />
        <div className="container-site relative text-center">
          <p className="eyebrow">{game.competition} · {formatGameDate(game.date)} · {formatGameTime(game.date)}</p>
          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex flex-col items-center gap-3">
              <img src={crest} alt="" className="h-24 w-24 object-contain sm:h-36 sm:w-36" />
              <p className="font-display text-2xl font-black uppercase text-ice-white sm:text-4xl">Sabra HC</p>
            </div>
            <p className="tabular font-display text-6xl font-black text-ice-white sm:text-8xl">
              {final ? `${game.sabraScore}–${game.opponentScore}` : "VS"}
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-line bg-night-2 font-display text-3xl font-black text-muted-text sm:h-36 sm:w-36">
                {game.opponent.slice(0, 2).toUpperCase()}
              </div>
              <p className="font-display text-2xl font-black uppercase text-ice-white sm:text-4xl">{game.opponent}</p>
            </div>
          </div>
          {!final && game.ticketUrl && (
            <a href={game.ticketUrl} target="_blank" rel="noreferrer" className="btn-primary mt-10">
              <Ticket className="h-5 w-5" /> Get tickets{game.priceFromNis ? ` · from ₪${game.priceFromNis}` : ""}
            </a>
          )}
        </div>
      </section>
      <section className="bg-night-2 py-16">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          {game.preview && (
            <div>
              <h2 className="text-4xl font-black text-ice-white">Preview</h2>
              <p className="mt-3 text-lg text-muted-text">{game.preview}</p>
            </div>
          )}
          {arena && (
            <div className="rounded-lg border border-line bg-night p-6">
              <h2 className="flex items-center gap-2 text-3xl font-black text-ice-white">
                <MapPin className="h-6 w-6 text-sand" /> {arena.name}
              </h2>
              <p className="mt-2 text-muted-text">{arena.city} · {arena.capacity}</p>
              {arena.mapUrl && (
                <a href={arena.mapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-ice underline">
                  Open in maps
                </a>
              )}
            </div>
          )}
          {game.recapSlug && (
            <Link to={`/news/${game.recapSlug}`} className="btn-outline">
              Read the recap
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default GameDetail;
