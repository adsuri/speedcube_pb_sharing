import PuzzleCard from "./PuzzleCard";
import PuzzleForm from "./PuzzleForm";
import { Puzzle } from "./Puzzle";
import { useState } from "react";

export interface PuzzleListProps {
  puzzles: Puzzle[]
}

function PuzzleList(
  { puzzles }: PuzzleListProps
) {
  const [puzzleBeingEdited, setPuzzleBeingEdited] = useState<Puzzle | {}>({});

  const handleEdit = (puzzle: Puzzle) => {
    setPuzzleBeingEdited(puzzle);
  };

  const cancelEditing = () => {
    setPuzzleBeingEdited({});
  };

  return (
    <div className="row">
      {
        puzzles.map(puzzle => (
          <div key={puzzle.name} className="cols-sm">
            {
              puzzle === puzzleBeingEdited ? (
                <PuzzleForm 
                  puzzle={puzzle}
                  onCancel={cancelEditing} />
              ) : (
                <PuzzleCard 
                  puzzle={puzzle}
                  onEdit={handleEdit}/>
              )
            }
          </div>

          // <div key={puzzle.name} className="cols-sm">
          //   <PuzzleCard puzzle={puzzle} />
          //   <div className="small">
          //     <PuzzleForm puzzle={puzzle} />
          //   </div>
          // </div>
        ))
      }
    </div>
  );
}

export default PuzzleList;