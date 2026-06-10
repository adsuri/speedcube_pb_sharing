import { Puzzle } from "./Puzzle";
import PuzzleCard from "./PuzzleCard";
import PuzzleForm from "./PuzzleForm";

export interface PuzzleListProps {
  puzzles: Puzzle[]
}

function PuzzleList(
  { puzzles }: PuzzleListProps
) {
  return (
    <div className="row">
      {
        puzzles.map(puzzle => (
          <div key={puzzle.name} className="cols-sm">
            <PuzzleCard puzzle={puzzle} />
            <div className="small">
              <PuzzleForm puzzle={puzzle} />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default PuzzleList;