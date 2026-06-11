import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { convertTime } from "../util";
import { CATEGORIES } from "../CONSTANTS";
import { PBest } from "./PBest";

export interface PuzzleFormProps {
  puzzle: Puzzle;
  onCancel: () => void
}

function PuzzleForm(
  { puzzle: initialPuzzle, onCancel }: PuzzleFormProps
) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);

  const puzzleName: string = puzzle.name + "_";

  return puzzle.name != "mbld" // vvvvv regular form
    ? (<form>
        <fieldset>
          <legend>Current Main</legend>
          <input type="text" name="currMain" placeholder="Enter current main..."
            defaultValue={puzzle.currMain && puzzle.currMain}/>
        </fieldset>
        {
          CATEGORIES.map((category: string) => (
            <fieldset>
              <legend>{category}</legend>

              <input type="text" name={puzzleName + category + "_h"} inputMode="numeric"
                placeholder="HH" style={{ width: "4rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[1] : ""} />
              <input type="text" name={puzzleName + category + "_m"} inputMode="numeric"
                placeholder="MM" style={{ width: "4rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[2] : ""} />
              <input type="text" name={puzzleName + category + "_s"} inputMode="numeric"
                placeholder="SS" style={{ width: "5rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[3] : ""} />

              <br /> <br />

              <input type="date" id="isoDate" name={puzzleName + category + "_setOn"}
                defaultValue={puzzle.records[category]?.setOn != null
                ? puzzle.records[category].setOn.toISOString().split("T")[0] : ""} />
              <span className="spacer"></span>

              In Comp?
              <input type="checkbox" name={puzzleName + category + "_inComp"}
                defaultChecked={puzzle.records[category]?.setInComp}/>
            </fieldset>
          ))
        }

        <div className="input-group">
          <button className="primary bordered medium">
            Save
            </button>
          <span />
          <button type="button" className="bordered medium" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>) // vvvvv multiblind form
    : (<form>
        <fieldset>
          <legend>Current Main</legend>
          <input type="text" name="currMain" placeholder="Enter current main..."
            defaultValue={puzzle.currMain && puzzle.currMain}/>
        </fieldset>

        {
          CATEGORIES.map((category: string) => (
            <fieldset>
              <legend>{category}</legend>

              <input type="text" name={puzzleName + category + "_solved"} inputMode="numeric"
                placeholder="" style={{ width: "3rem" }}
                defaultValue={(() => {
                  const record: PBest | null = puzzle.records[category];

                  if (record == null) {
                    return "";
                  } else {
                    if (Array.isArray(record.score)) {
                      return record.score[0][0];
                    }
                  }
                })()} /> / <span className="spacer"></span>

              <input type="text" name={puzzleName + category + "_attempted"} inputMode="numeric"
                placeholder="" style={{ width: "3rem" }}
                defaultValue={(() => {
                  const record: PBest | null = puzzle.records[category];

                  if (record == null) {
                    return "";
                  } else {
                    if (Array.isArray(record.score)) {
                      return record.score[0][1];
                    }
                  }
                })()} />

              <br />

              <input type="text" name={puzzleName + category + "_h"} inputMode="numeric"
                placeholder="HH" style={{ width: "4rem" }}
                defaultValue={(() => {
                  const record: PBest | null = puzzle.records[category];

                  if (record == null) {
                    return "";
                  } else {
                    if (Array.isArray(record.score)) {
                      console.log(record.score);
                      console.log(convertTime(record.score[1]));
                      return String(convertTime(record.score[1])[1]);
                    }
                  }
                })()} />
              
              <input type="text" name={puzzleName + category + "_m"} inputMode="numeric"
                placeholder="MM" style={{ width: "4rem" }}
                defaultValue={(() => {
                  const record: PBest | null = puzzle.records[category];

                  if (record == null) {
                    return "";
                  } else {
                    if (Array.isArray(record.score)) {
                      console.log(convertTime(record.score[1]));
                      return String(convertTime(record.score[1])[2]);
                    }
                  }
                })()} />

              <input type="text" name={puzzleName + category + "_s"} inputMode="numeric"
                placeholder="SS" style={{ width: "5rem" }}
                defaultValue={(() => {
                  const record: PBest | null = puzzle.records[category];

                  if (record == null) {
                    return "";
                  } else {
                    if (Array.isArray(record.score)) {
                      console.log(convertTime(record.score[1]));
                      return String(convertTime(record.score[1])[3]);
                    }
                  }
                })()} />

              <br /> <br />

              <input type="date" id="isoDate" name={puzzleName + category + "_setOn"}
                defaultValue={puzzle.records[category]?.setOn != null
                ? puzzle.records[category].setOn.toISOString().split("T")[0] : ""} />
              <span className="spacer"></span>

              In Comp?
              <input type="checkbox" name={puzzleName + category + "_inComp"}
                defaultChecked={puzzle.records[category]?.setInComp}/>
            </fieldset>
          ))
        }

        <div className="input-group">
          <button className="primary bordered medium"> Save </button>
          <span />
          <button type="button" className="bordered medium" onClick={onCancel}> Cancel </button>
        </div>
      </form>);
}

export default PuzzleForm;