import PuzzleCard from "./PuzzleCard";
import PuzzleForm from "./PuzzleForm";
import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { CATEGORIES, PUZZLE_NAMES, PUZZLES } from "../CONSTANTS";

export interface PuzzleListProps {
  puzzles: Puzzle[];
  onSave: (p: Puzzle) => void
}

function PuzzleList(
  { puzzles, onSave }: PuzzleListProps
) {
  const [puzzleBeingEdited, setPuzzleBeingEdited] = useState<Puzzle | null>(null);

  const [puzzleSelected, setPuzzleSelected] = useState<string>("");

  const handleEdit = (puzzle: Puzzle): void => {
    setPuzzleBeingEdited(puzzle);
  };

  const cancelEditing = (): void => {
    if (puzzleBeingEdited != null) onSave(puzzleBeingEdited);
    setPuzzleBeingEdited(null);
  };

  const handleChange = (event: any): void => {
    setPuzzleSelected(event.target.value);
  };

  const handleAddPuzzle = (event: any): void => {
    event.preventDefault();
    const selected: string = puzzleSelected;

    setPuzzleSelected("");
  };

  return (
    <>
      <div className="container puzzlelist-header">
        <h1>Puzzles:</h1>

        <form onSubmit={handleAddPuzzle}>
          <select name="puzzle-to-add"
            value={puzzleSelected}
            onChange={handleChange}>
            <option value="" disabled> Select a puzzle to add...</option>

            {
              PUZZLES.map((p: string) => {
                const activePuzzles: string[] = puzzles.map((p: Puzzle) => p.name);

                if (activePuzzles.includes(p)) {
                  return;
                } else {
                  return (<option value={p}>{PUZZLE_NAMES[p]}</option>);
                }
              })
            }
          </select>

          <button className="primary">Add Puzzle</button>
        </form>
      </div>
      <div className="row cols-sm-12 cols-md-6 cols-lg-4">
        {
          puzzles.map(puzzle => (
            <div key={puzzle.name}>
              {
                puzzle.name == puzzleBeingEdited?.name ? (
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
    </>
  );
}

export default PuzzleList;