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
    <div className="card fluid">
      <section className="section dark">
        <strong>
          Event: {PUZZLE_NAMES[puzzle.name]}
        </strong>
      </section>

      {puzzle.currMain && (
        <section className="section">
          <strong>Current Main</strong>
          <p>{puzzle.currMain}</p>
        </section>
      )}

      <section className="section" style={{textAlign: "left"}}>
        {
          CATEGORIES.map((category) => {
            const record: PBest | null = puzzle.records[category];

            if (record == null) return null;

            if (puzzle.name == "mbld") { // mbld card
              if (Array.isArray(record.score)) {
                const [[solved, attempted], time] = record.score;

                return (
                  <div key={category}>
                    <div>
                      <b>{category}</b>: {solved}/{attempted} {time != 0 && " in " + convertTime(time)[0]}
                    </div>

                    <small> {record.setOn?.toISOString().split("T")[0]} </small>

                    {record.setInComp && (
                      <>
                        <span> </span>
                        <small>
                          <mark>Competition</mark>
                        </small>
                      </>
                    )}
                  </div>
                );
              }
            } if (puzzle.name == "fmc") { // fmc card
              return (
                <div key={category}>
                  <div><b>{category}</b>: {record.score} moves</div>

                  <small> {record.setOn?.toISOString().split("T")[0]} </small>

                  {record.setInComp && (
                    <>
                      <span> </span>
                      <small>
                        <mark>Competition</mark>
                      </small>
                    </>
                  )}
                </div>
              );
            } else { // regular card
              return (
                <div key={category}>
                  <div><b>{category}</b>: {convertTime(Number(record.score))[0]}</div>

                  <small> {record.setOn?.toISOString().split("T")[0]}</small>

                  {record.setInComp && (
                    <>
                      <span> </span>
                      <small>
                        <mark>Competition</mark>
                      </small>
                    </>
                  )}
                </div>
              );
            }
          })
        }
      </section>

      <section className="section" style={{textAlign: "left"}}>
        <button className="primary" onClick={() => {onEdit(puzzle.name)}}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default PuzzleCard;