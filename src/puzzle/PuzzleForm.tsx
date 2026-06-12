import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { convertTime } from "../util";
import { CATEGORIES } from "../CONSTANTS";
import { PBest } from "./PBest";
import { useEffect } from "react";

export interface PuzzleFormProps {
  puzzle: Puzzle;
  onCancel: () => void
}

type FormData = Record<string, any>;

function PuzzleForm(
  { puzzle: initialPuzzle, onCancel }: PuzzleFormProps
) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);
  const [formData, setFormData] = useState<FormData>({});

  const puzzleName: string = puzzle.name + "_";

  let records: Record<string, PBest | null> = puzzle.records;

  useEffect(() => {
      const newData: FormData = {
          currMain: puzzle.currMain ?? ""
      };

      if (puzzle.name != "mbld") { // regular form
        for (const category of CATEGORIES) {
          const record = records[category];

          if (record != null) {
            const convertedTime = convertTime(Number(record.score));

            newData[category + "_h"] = convertedTime[1];
            newData[category + "_m"] = convertedTime[2];
            newData[category + "_s"] = convertedTime[3];
            newData[category + "_setOn"] = record.setOn?.toISOString().split("T")[0] ?? "";
            newData[category + "_setinComp"] = record.setInComp ?? false;
          } else {
            newData[category + "_h"] = "";
            newData[category + "_m"] = "";
            newData[category + "_s"] = "";
            newData[category + "_setOn"] = "";
            newData[category + "_setinComp"] = false;
          }
        }

        setFormData(newData);
      } else { // mbld form
        for (const category of CATEGORIES) {
          const record = records[category];

          if (record != null) {
            let convertedTime: any;

            if (Array.isArray(record.score)) {
              convertedTime = convertTime(Number(record.score[1]));
              newData[category + "_solved"] = record.score[0][0];
              newData[category + "_attempted"] = record.score[0][1];
            }

            newData[category + "_h"] = convertedTime[1];
            newData[category + "_m"] = convertedTime[2];
            newData[category + "_s"] = convertedTime[3];
            newData[category + "_setOn"] = record.setOn?.toISOString().split("T")[0] ?? "";
            newData[category + "_setinComp"] = record.setInComp ?? false;
          } else {
            newData[category + "_solved"] = "";
            newData[category + "_attempted"] = "";
            newData[category + "_h"] = "";
            newData[category + "_m"] = "";
            newData[category + "_s"] = "";
            newData[category + "_setOn"] = "";
            newData[category + "_setinComp"] = false;
          }
        }

        setFormData(newData);
      }
    }, []);

  return puzzle.name != "mbld" // regular form
    ? (<form>
        <fieldset>
          <legend>Current Main</legend>
          <input type="text" name="currMain" placeholder="Enter current main..."
            defaultValue={formData["currMain"]}/>
        </fieldset>
        {
          CATEGORIES.map((category: string) => (
            <fieldset>
              <legend>{category}</legend>

              <input type="text" name={category + "_h"} inputMode="numeric"
                placeholder="HH" style={{ width: "4rem" }}
                defaultValue={formData[category + "_h"]} />
              <input type="text" name={category + "_m"} inputMode="numeric"
                placeholder="MM" style={{ width: "4rem" }}
                defaultValue={formData[category + "_m"]} />
              <input type="text" name={category + "_s"} inputMode="numeric"
                placeholder="SS" style={{ width: "5rem" }}
                defaultValue={formData[category + "_s"]} />

              <br /> <br />

              <input type="date" id="isoDate" name={category + "_setOn"}
                defaultValue={formData[category + "_setOn"]} />

              <span className="spacer"></span>

              In Comp?
              <input type="checkbox" name={category + "_setInComp"}
                defaultChecked={formData[category + "_setInComp"]}/>
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

              <input type="text" name={category + "_solved"} inputMode="numeric"
                placeholder="" style={{ width: "3rem" }}
                defaultValue={formData[category + "_solved"]} /> / <span className="spacer"></span>

              <input type="text" name={category + "_attempted"} inputMode="numeric"
                placeholder="" style={{ width: "3rem" }}
                defaultValue={formData[category + "_attempted"]} />

              <br />

              <input type="text" name={category + "_h"} inputMode="numeric"
                placeholder="HH" style={{ width: "4rem" }}
                defaultValue={formData[category + "_h"]} />
              
              <input type="text" name={category + "_m"} inputMode="numeric"
                placeholder="MM" style={{ width: "4rem" }}
                defaultValue={formData[category + "_m"]} />

              <input type="text" name={category + "_s"} inputMode="numeric"
                placeholder="SS" style={{ width: "5rem" }}
                defaultValue={formData[category + "_s"]} />

              <br /> <br />

              <input type="date" id="isoDate" name={category + "_setOn"}
                defaultValue={formData[category + "_setOn"]} />
              <span className="spacer"></span>

              In Comp?
              <input type="checkbox" name={category + "_setInComp"}
                defaultChecked={formData[category + "_setInComp"]}/>
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