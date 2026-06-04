import { Puzzle } from "./Puzzle";
import { CATEGORIES, PUZZLES, PUZZLE_NAMES } from "../CONSTANTS";

export interface PuzzleCardProps {
  puzzle: Puzzle;
}

function PuzzleCard(
  { puzzle }: PuzzleCardProps
) {
  return (
    <div className="card rounded">
      <section className="section dark puzzle-card">
        <strong className="strong">Event: {PUZZLE_NAMES[puzzle.name]}</strong>
        {
          CATEGORIES.map(
            (category) => ( puzzle.records[category] &&
              <p>{category}: {puzzle.records[category].score}</p>
            )
          )
        }
      </section>
    </div>
  );
}

export default PuzzleCard;