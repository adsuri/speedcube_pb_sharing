import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { convertTime } from "../util";
import { CATEGORIES } from "../CONSTANTS";
import { PBest } from "./PBest";

export interface PuzzleFormProps {
  puzzle: Puzzle
}

function PuzzleForm(
  { puzzle: initialPuzzle }: PuzzleFormProps
) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);

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

              <input type="text" name={category + "_h"} inputMode="numeric"
                placeholder="HH" style={{ width: "4rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[1] : ""} />
              <input type="text" name={category + "_m"} inputMode="numeric"
                placeholder="MM" style={{ width: "4rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[2] : ""} />
              <input type="text" name={category + "_s"} inputMode="numeric"
                placeholder="SS" style={{ width: "5rem" }}
                defaultValue={puzzle.records[category] != null ? convertTime(Number(puzzle.records[category].score))[3] : ""} />

              <br /> <br />

              <input type="date" id="isoDate" name={category + "_setOn"}
                defaultValue={puzzle.records[category]?.setOn != null
                ? puzzle.records[category].setOn.toISOString().split("T")[0] : ""} />
              <span className="spacer"></span>

              In Comp? <input type="checkbox" defaultChecked={puzzle.records[category]?.setInComp}/>
            </fieldset>
          ))
        }
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

              <input type="text" name={category + "_solved"} inputMode="numeric"
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

              <input type="text" name={category + "_attempted"} inputMode="numeric"
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

              <input type="text" name={category + "_h"} inputMode="numeric"
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
              
              <input type="text" name={category + "_m"} inputMode="numeric"
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

              <input type="text" name={category + "_s"} inputMode="numeric"
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

              <input type="date" id="isoDate" name={category + "_setOn"}
                defaultValue={puzzle.records[category]?.setOn != null
                ? puzzle.records[category].setOn.toISOString().split("T")[0] : ""} />
              <span className="spacer"></span>
              
              In Comp? <input type="checkbox" defaultChecked={puzzle.records[category]?.setInComp}/>
            </fieldset>
          ))
        }
      </form>);

  // return puzzle.name != "mbld" ? (
  //   <form>
  //     <fieldset>
  //       <legend>single</legend>
  //       <input type="text" name="single_h" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[1]}
  //       />
  //       <input type="text" name="single_m" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[2]}
  //       />
  //       <input type="text" name="single_s" inputMode="numeric"
  //         placeholder="" style={{ width: "5rem" }}
  //         defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[3]}
  //       />
  //     </fieldset>

  //     {/* <fieldset>
  //       <legend>mo3</legend>
  //       <input type="text" name="mo3_h" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[1]}
  //       />
  //       <input type="text" name="mo3_m" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[2]}
  //       />
  //       <input type="text" name="mo3_s" inputMode="numeric"
  //         placeholder="" style={{ width: "5rem" }}
  //         defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[3]}
  //       />
  //     </fieldset>

  //     <fieldset>
  //       <legend>ao5</legend>
  //       <input type="text" name="ao5_h" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[1]}
  //       />
  //       <input type="text" name="ao5_m" inputMode="numeric"
  //         placeholder="" style={{ width: "3rem" }}
  //         defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[2]}
  //       />
  //       <input type="text" name="ao5_s" inputMode="numeric"
  //         placeholder="" style={{ width: "5rem" }}
  //         defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[3]}
  //       />
  //     </fieldset> */}
  //   </form>
  // ) : null;
}

export default PuzzleForm;