import { Puzzle } from "./Puzzle";
import type { PBest } from "./PBest";

import { CATEGORIES, PUZZLE_NAMES } from "../CONSTANTS";
import { convertTime } from "../util";

export interface PuzzleCardProps {
  puzzle: Puzzle;
  onEdit: (p: Puzzle) => void;
  onDelete: (p: Puzzle) => void;
}

function PuzzleCard(
  { puzzle, onEdit, onDelete }: PuzzleCardProps
) {
  return (
    <div className="card fluid">
      <section className="section dark card-header">
        <img src={"../../../public/assets/" + puzzle.name + ".svg"}
          style={{ maxInlineSize: "20px"}} alt={PUZZLE_NAMES[puzzle.name]}/> 
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

      <section className="section" style={{ textAlign: "left" }}>
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

      <section className="section" style={{ textAlign: "left" }}>
        <button className="primary" onClick={() => { onEdit(puzzle); }}>
          <span className="icon-edit "></span>
          Edit
        </button>

        <button className="secondary" onClick={() => { onDelete(puzzle) }}>
          Delete
        </button>
      </section>
    </div>
  );
}

export default PuzzleCard;