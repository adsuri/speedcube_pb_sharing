import { Puzzle } from "./Puzzle";
import { CATEGORIES, PUZZLE_NAMES } from "../CONSTANTS";
import type { PBest } from "./PBest";
import { convertTime } from "../util";

export interface PuzzleCardProps {
  puzzle: Puzzle
}

function PuzzleCard(
  { puzzle }: PuzzleCardProps
) {
  return (
    <div className="card rounded">
      <section className="section dark puzzle-card">
        <strong className="strong">Event: {PUZZLE_NAMES[puzzle.name]}</strong>
        <p><b>Current Main</b>: {puzzle.currMain}</p>

        {
          CATEGORIES.map((category) => {
            const record: PBest | null = puzzle.records[category];

            if (record == null) return null;

            if (puzzle.name == "mbld") {
              if (Array.isArray(record.score)) {
                const [[solved, attempted], time] = record.score;

                return (
                  <p>{category}: {solved}/{attempted} in {convertTime(time)[0]}</p>
                );
              }
            } else {
              return (
                <p>
                  <b>{category}</b>: {convertTime(Number(record.score))[0]}
                  {record.setOn && ": " + record.setOn.toISOString().split("T")[0]}
                  {record.setInComp && " (set in comp) "}
                </p>
              );
            }
          })
        }

        <button className="bordered">
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default PuzzleCard;