import { Puzzle } from "./Puzzle";
import { CATEGORIES, PUZZLE_NAMES } from "../CONSTANTS";
import type { PBest } from "./PBest";
import { convertTime } from "../util";

export interface PuzzleCardProps {
  puzzle: Puzzle;
}

        // {/* {
        //   CATEGORIES.map(
        //     (category) => ( puzzle.records[category] &&
        //       <p>{category}: {puzzle.records[category].score}</p>
        //     )
        //   )
        // } */}


function PuzzleCard(
  { puzzle }: PuzzleCardProps
) {
  return (
    <div className="card rounded">
      <section className="section dark puzzle-card">
        <strong className="strong">Event: {PUZZLE_NAMES[puzzle.name]}</strong>

        {
          CATEGORIES.map((category) => {
            const record: PBest | null = puzzle.records[category];

            if (record == null) return null;

            if (puzzle.name == "mbld") {
              if (Array.isArray(record.score)) {
                const [[solved, attempted], time] = record.score;

                return (
                  <p>{category}: {solved}/{attempted} in {convertTime(time)}</p>
                );
              }
            } else {
              return (
                <p>{category}: {record.score}</p>
              );
            }
          })
        }
      </section>
    </div>
  );
}

export default PuzzleCard;