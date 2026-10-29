import { Link, useParams } from "react-router-dom";
import { MapPin, Ticket } from "lucide-react";
import crest from "@/assets/sabra-crest.webp";
import { CamFrame } from "@/components/broadcast";
import { GameRecap } from "@/components/tour";
import { club, games } from "@/data/club";
import { gameDate, gameTime, gamePlace } from "@/lib/games";
import NotFound from "./NotFound";

const GameDetail = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  if (!game) return <NotFound />;
  const final = game.status === "final";
  const place = gamePlace(game);

  return (
    <>
      <CamFrame label={`CAM 1 · ${final ? "Final" : "Pre-game"}`} rec={!final} className="border-b border-line">
        <div className="container-site relative pb-16 pt-20 text-center">
          <p className="tag-sand">{game.competition} · {gameDate(game)} · {gameTime(game)}</p>
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
              <Ticket className="h-5 w-5" /> Get tickets
            </a>
          )}
        </div>
      </CamFrame>
      <section className="bg-night-2 py-16">
        <div className="container-site grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          {final ? <GameRecap game={game} /> : game.preview ? (
            <div>
              <h2 className="text-4xl font-black text-ice-white">Preview</h2>
              <p className="mt-3 text-lg text-muted-text">{game.preview}</p>
            </div>
          ) : <div />}
          <div className="grid gap-4">
            {place && (
              <div className="border border-line bg-night p-6">
                <h2 className="flex items-center gap-2 text-3xl font-black text-ice-white">
                  <MapPin className="h-6 w-6 text-sand" /> {place}
                </h2>
              </div>
            )}
            {final && (
              <p className="text-sm text-muted-text">
                Source: official {club.leagueShort} game sheet{game.sheetNote ? ` (${game.sheetNote})` : ""}.{" "}
                <a href={club.statsUrl} target="_blank" rel="noreferrer" className="text-ice underline">League stats</a>
              </p>
            )}
            {game.recapSlug && (
              <Link to={`/news/${game.recapSlug}`} className="btn-outline justify-self-start">
                Read the story
              </Link>
            )}
            <Link to="/schedule" className="label text-sm text-sand hover:text-sand-soft">All games →</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameDetail;
