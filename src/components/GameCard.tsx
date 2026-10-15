import { Link } from "react-router-dom";
import crest from "@/assets/sabra-crest.webp";
import type { Game } from "@/data/club";
import { arenaFor, formatGameDate, formatGameTime } from "@/lib/games";

const competitionColor: Record<Game["competition"], string> = {
  INHL: "bg-ice text-night",
  "Sabra Series": "bg-sand text-night",
  International: "bg-ice-white text-night",
  "Continental Cup": "bg-[#2F6B45] text-ice-white",
};

const GameCard = ({ game }: { game: Game }) => {
  const arena = arenaFor(game);
  const final = game.status === "final";
  return (
    <article className="card-lift grid gap-4 rounded-lg border border-line bg-night-2 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
      <div className="tabular min-w-[96px]">
        <p className="font-display text-2xl font-black uppercase text-ice-white">{formatGameDate(game.date)}</p>
        <p className="text-sm text-muted-text">{final ? "Final" : formatGameTime(game.date)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${competitionColor[game.competition]}`}>
          {game.competition}
        </span>
        <div className="flex items-center gap-3">
          <img src={crest} alt="" className="h-9 w-9 object-contain" />
          <p className="font-display text-2xl font-black uppercase text-ice-white">
            {game.home ? "Sabra HC vs" : "Sabra HC at"} {game.opponent}
          </p>
        </div>
        {arena && <p className="w-full text-sm text-muted-text">{arena.name}, {arena.city}</p>}
      </div>
      <div className="flex items-center gap-3">
        {final ? (
          <p className="tabular font-display text-4xl font-black text-ice-white">
            {game.sabraScore}–{game.opponentScore}
            {game.result && <span className="ml-2 text-xl text-sand">{game.result}</span>}
          </p>
        ) : (
          <>
            {game.priceFromNis && <span className="text-sm text-muted-text">from ₪{game.priceFromNis}</span>}
            <Link to={`/games/${game.id}`} className="btn-primary min-h-[44px] px-5 text-base">
              {game.ticketUrl ? "Tickets" : "Details"}
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default GameCard;
