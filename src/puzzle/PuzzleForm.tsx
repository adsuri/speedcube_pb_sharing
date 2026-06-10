import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { convertTime } from "../util";

export interface PuzzleFormProps {
  puzzle: Puzzle
}

function PuzzleForm(
  { puzzle: initialPuzzle }: PuzzleFormProps
) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);
  puzzle.records["single"] != null ?
    console.log(convertTime(Number(puzzle.records["single"].score))) : console.log();
  console.log(puzzle.name);

  return puzzle.name != "mbld" ? (
    <form>
      <fieldset>
        <legend>single</legend>
        <input type="text" name="single_h" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[1]}
        />
        <input type="text" name="single_m" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[2]}
        />
        <input type="text" name="single_s" inputMode="numeric"
          placeholder="" style={{ width: "5rem" }}
          defaultValue={puzzle.records["single"] == null ? "" : convertTime(Number(puzzle.records["single"].score))[3]}
        />
      </fieldset>

      <fieldset>
        <legend>mo3</legend>
        <input type="text" name="mo3_h" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[1]}
        />
        <input type="text" name="mo3_m" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[2]}
        />
        <input type="text" name="mo3_s" inputMode="numeric"
          placeholder="" style={{ width: "5rem" }}
          defaultValue={puzzle.records["mo3"] == null ? "" : convertTime(Number(puzzle.records["mo3"].score))[3]}
        />
      </fieldset>

      <fieldset>
        <legend>ao5</legend>
        <input type="text" name="ao5_h" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[1]}
        />
        <input type="text" name="ao5_m" inputMode="numeric"
          placeholder="" style={{ width: "3rem" }}
          defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[2]}
        />
        <input type="text" name="ao5_s" inputMode="numeric"
          placeholder="" style={{ width: "5rem" }}
          defaultValue={puzzle.records["ao5"] == null ? "" : convertTime(Number(puzzle.records["ao5"].score))[3]}
        />
      </fieldset>
    </form>
  ) : null;
}

export default PuzzleForm;