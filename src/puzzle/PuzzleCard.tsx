import { Puzzle } from "./Puzzle";
import { CATEGORIES, PUZZLE_NAMES } from "../CONSTANTS";
import type { PBest } from "./PBest";
import { convertTime } from "../util";

export interface PuzzleCardProps {
  puzzle: Puzzle;
  onEdit: (puzzleName: string) => void
}

function PuzzleCard(
  { puzzle, onEdit }: PuzzleCardProps
) {

  return (
    <div className="card rounded">
      <section className="section dark puzzle-card">
        <strong className="strong">Event: {PUZZLE_NAMES[puzzle.name]}</strong>
        {(puzzle.currMain && <p><b>Current Main</b>: {puzzle.currMain}</p>)}

        {
          CATEGORIES.map((category) => {
            const record: PBest | null = puzzle.records[category];

            if (record == null) return null;

            if (puzzle.name == "mbld") { // mbld card
              if (Array.isArray(record.score)) {
                const [[solved, attempted], time] = record.score;

                return (
                  <p key={category}>
                    <b>{category}</b>: {solved}/{attempted} {time != 0 && " in " + convertTime(time)[0]}
                    {record.setOn && ": " + record.setOn.toISOString().split("T")[0]}
                    {record.setInComp && " (set in comp) "}
                  </p>
                );
              }
            } if (puzzle.name == "fmc") { // fmc card
              return (
                <p key={category}>
                  <b>{category}</b>: {record.score} moves
                  {record.setOn && ": " + record.setOn.toISOString().split("T")[0]}
                  {record.setInComp && " (set in comp) "}
                </p>
              );
            } else { // regular card
              return (
                <p key={category}>
                  <b>{category}</b>: {convertTime(Number(record.score))[0]}
                  {record.setOn && ": " + record.setOn.toISOString().split("T")[0]}
                  {record.setInComp && " (set in comp) "}
                </p>
              );
            }
          })
        }

        <button className="bordered" onClick={() => {onEdit(puzzle.name)}}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default PuzzleCard;