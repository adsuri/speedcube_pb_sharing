import PuzzleCard from "./PuzzleCard";
import PuzzleForm from "./PuzzleForm";
import { Puzzle } from "./Puzzle";
import { useState } from "react";

export interface PuzzleListProps {
  puzzles: Puzzle[];
  onSave: (p: Puzzle) => void
}

function PuzzleList(
  { puzzles, onSave }: PuzzleListProps
) {
  const [puzzleBeingEdited, setPuzzleBeingEdited] = useState<string>("");

  const handleEdit = (puzzleName: string): void => {
    setPuzzleBeingEdited(puzzleName);
  };

  const cancelEditing = (): void => {
    setPuzzleBeingEdited("");
  };

  return (
    <div className="row">
      {
        puzzles.map(puzzle => (
          <div key={puzzle.name} className="cols-sm">
            {
              puzzle.name === puzzleBeingEdited ? (
                <PuzzleForm 
                  puzzle={puzzle}
                  onSave={(p: Puzzle) => {
                    cancelEditing();
                    onSave(p);
                  }}
                  onCancel={cancelEditing} />
              ) : (
                <PuzzleCard 
                  puzzle={puzzle}
                  onEdit={handleEdit}/>
              )
            }
          </div>
        ))
      }
    </div>
  );
}

export default PuzzleList;