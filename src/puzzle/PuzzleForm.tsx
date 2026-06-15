import { Puzzle } from "./Puzzle";
import { useState } from "react";
import { convertTime } from "../util";
import { CATEGORIES } from "../CONSTANTS";
import { PBest } from "./PBest";

export interface PuzzleFormProps {
  puzzle: Puzzle;
  onCancel: () => void
}

type FormData = Record<string, any>;
type ErrorData = Record<string, string[]>;

function PuzzleForm(
  { puzzle: initialPuzzle, onCancel }: PuzzleFormProps
) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);
  const [errors, setErrors] = useState<ErrorData>({});

  const records: Record<string, PBest | null> = puzzle.records;

  const [formData, setFormData] = useState<FormData>(() => {
    const newData: FormData = {
          currMain: puzzle.currMain ?? ""
    };
    
    if (puzzle.name == "mbld") { // mbld form
      for (const category of CATEGORIES) {
        const record: PBest | null = records[category];

        if (record != null) {
          let convertedTime: [string, number, number, number] = ["", 0, 0, 0];

          if (Array.isArray(record.score)) {
            convertedTime = convertTime(Number(record.score[1]));
            newData[category + "_solved"] = record.score[0][0];
            newData[category + "_attempted"] = record.score[0][1];
          }

          newData[category + "_h"] = convertedTime[1];
          newData[category + "_m"] = convertedTime[2];
          newData[category + "_s"] = convertedTime[3];
          newData[category + "_setOn"] = record.setOn?.toISOString().split("T")[0] ?? "";
          newData[category + "_setInComp"] = record.setInComp ?? false;
        } else {
          newData[category + "_solved"] = "";
          newData[category + "_attempted"] = "";
          newData[category + "_h"] = "";
          newData[category + "_m"] = "";
          newData[category + "_s"] = "";
          newData[category + "_setOn"] = "";
          newData[category + "_setInComp"] = false;
        }
      }

      return newData;
    } if (puzzle.name == "fmc") { // fmc form
      for (const category of CATEGORIES) {
        const record: PBest | null = records[category];

        if (record != null) {
          newData[category + "_moves"] = record.score;
          newData[category + "_setOn"] = record.setOn?.toISOString().split("T")[0] ?? "";
          newData[category + "_setInComp"] = record.setInComp ?? false;
        } else {
          newData[category + "_moves"] = "";
          newData[category + "_setOn"] = "";
          newData[category + "_setInComp"] = false;
        }
      }

      return newData;
    } else { // regular form
      for (const category of CATEGORIES) {
        const record: PBest | null = records[category];

        if (record != null) {
          const convertedTime: [string, number, number, number] = convertTime(Number(record.score));

          newData[category + "_h"] = convertedTime[1];
          newData[category + "_m"] = convertedTime[2];
          newData[category + "_s"] = convertedTime[3];
          newData[category + "_setOn"] = record.setOn?.toISOString().split("T")[0] ?? "";
          newData[category + "_setInComp"] = record.setInComp ?? false;
        } else {
          newData[category + "_h"] = "";
          newData[category + "_m"] = "";
          newData[category + "_s"] = "";
          newData[category + "_setOn"] = "";
          newData[category + "_setInComp"] = false;
        }
      }

      return newData;
    } 
  });

  const isNumericOrEmpty = (str: string): boolean => {
    return str == "" || (!isNaN(Number(str)) && isFinite(Number(str)));
  };
  
  const isIntegerOrEmpty = (str: string): boolean => {
    return str == "" || (!isNaN(Number(str)) && isFinite(Number(str)) && Number.isInteger(Number(str)));
  };

  const isISODate = (str: string): boolean => {
    return str == "" || /^\d{4}-\d{2}-\d{2}$/.test(str);
  };

  const validate = (data: FormData): void => {
    let newErrorData: ErrorData = {};

    for (const category of CATEGORIES) {
      if (puzzle.name == "mbld") { // mbld validation
        newErrorData[category] = []

        let validScore: boolean = true;

        const solved: string = data[category + "_solved"];
        const attempted: string = data[category + "_attempted"];

        const solvedEmpty = solved == "";
        const attemptedEmpty = attempted == "";

        if (!isNumericOrEmpty(solved) || !isNumericOrEmpty(attempted)) {
          newErrorData[category].push("Please enter valid numbers...");
          validScore = false;
        } else if ((!solvedEmpty && attemptedEmpty) || (solvedEmpty && !attemptedEmpty)) {
          newErrorData[category].push("Please enter both parts of the record...");
          validScore = false;
        } else if (Number(solved) > Number(attempted)) {
          newErrorData[category].push("Please enter a possible record...");
          validScore = false;
        }

        if (validScore && !solvedEmpty && !attemptedEmpty) { // if the score is invalid, ignore the duration for the time being
          const hours: string = data[category + "_h"];
          const minutes: string = data[category + "_m"];
          const seconds: string = data[category + "_s"];

          if (hours == "" && minutes == "" && seconds == "") {
            newErrorData[category].push("Please enter a duration");
          } else if (!isNumericOrEmpty(hours) || !isNumericOrEmpty(minutes) || !isNumericOrEmpty(seconds)) {
            newErrorData[category].push("Please enter a valid duration");
          }
        }
      } else if (puzzle.name == "fmc") { // fmc validation
        newErrorData[category] = []

        const moves: string = data[category + "_moves"];

        if (!isIntegerOrEmpty(moves)) {
          newErrorData[category].push("Please enter a valid amount of moves...");
        }
      } else { // regular validation
        newErrorData[category] = []
        const hours: string = data[category + "_h"];
        const minutes: string = data[category + "_m"];
        const seconds: string = data[category + "_s"];

        if (!isNumericOrEmpty(hours) || !isNumericOrEmpty(minutes) || !isNumericOrEmpty(seconds)) {
          newErrorData[category].push("Please enter a valid duration");
        }
      }

      if (!isISODate(data[category + "_setOn"]) && data[category + "_setOn"] != "") {
        newErrorData[category].push("Please enter an ISO date format...")
      }
    }

    setErrors(newErrorData);
  };

  const isValid = (): boolean => {
    // check if errors is empty
    return true;
  };

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    const newData: FormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value
    };

    setFormData(newData);
    validate(newData);
  };

  return puzzle.name == "mbld" ? ( // mbld form
    <form>
      <fieldset>
        <legend>Current Main</legend>
        <input type="text" name="currMain" placeholder="Enter current main..."
          value={formData["currMain"] ?? ""} onChange={handleChange} />
      </fieldset>

      {
        CATEGORIES.map((category: string) => (
          <fieldset>
            <legend>{category}</legend>

            <input type="text" name={category + "_solved"} inputMode="numeric"
              placeholder="" style={{ width: "3rem" }}
              value={formData[category + "_solved"] ?? ""} onChange={handleChange} /> / <span></span>

            <input type="text" name={category + "_attempted"} inputMode="numeric"
              placeholder="" style={{ width: "3rem" }}
              value={formData[category + "_attempted"] ?? ""} onChange={handleChange} />

            <br />

            <input type="text" name={category + "_h"} inputMode="numeric"
              placeholder="HH" style={{ width: "4rem" }}
              value={formData[category + "_h"] ?? ""} onChange={handleChange} />
            :
            <input type="text" name={category + "_m"} inputMode="numeric"
              placeholder="MM" style={{ width: "4rem" }}
              value={formData[category + "_m"] ?? ""} onChange={handleChange} />
            :
            <input type="text" name={category + "_s"} inputMode="numeric"
              placeholder="SS" style={{ width: "5rem" }}
              value={formData[category + "_s"] ?? ""} onChange={handleChange} />

            <br />

            <input type="date" id="isoDate" name={category + "_setOn"}
              value={formData[category + "_setOn"] ?? ""} onChange={handleChange} />
            
            <span className="spacer"> </span>

            In Comp?
            <input type="checkbox" name={category + "_setInComp"}
              checked={formData[category + "_setInComp"] ?? false} onChange={handleChange} />

            <br />

            {errors[category] != null && errors[category].length != 0 && (
              <div className="card error small">
                {errors[category].map((e) => (
                  <>{e}</>
                ))}
              </div>
            )}
          </fieldset>
        ))
      }

      <div className="input-group">
        <button className="primary bordered medium"> Save </button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}> Cancel </button>
      </div>
    </form>
  ) : puzzle.name == "fmc" ? ( // fmc form
    <form>
      <fieldset>
        <legend>Current Main</legend>
        <input type="text" name="currMain" placeholder="Enter current main..."
          value={formData["currMain"] ?? ""} onChange={handleChange} />
      </fieldset>
      {
        CATEGORIES.map((category: string) => (
          <fieldset>
            <legend>{category}</legend>

            <input type="text" name={category + "_moves"} inputMode="numeric"
              placeholder="Moves..." style={{ width: "6rem" }}
              value={formData[category + "_moves"] ?? ""} onChange={handleChange} />

            <br />

            <input type="date" id="isoDate" name={category + "_setOn"}
              value={formData[category + "_setOn"] ?? ""} onChange={handleChange} />

            <span> </span>

            In Comp?
            <input type="checkbox" name={category + "_setInComp"}
              checked={formData[category + "_setInComp"] ?? false} onChange={handleChange} />

            <br />

            {errors[category] != null && errors[category].length != 0 && (
              <div className="card error small">
                {errors[category].map((e) => (
                  <>{e}</>
                ))}
              </div>
            )}
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
    </form>
  ) : ( // regular form
    <form>
      <fieldset>
        <legend>Current Main</legend>
        <input type="text" name="currMain" placeholder="Enter current main..."
          value={formData["currMain"] ?? ""} onChange={handleChange} />
      </fieldset>
      {
        CATEGORIES.map((category: string) => (
          <fieldset>
            <legend>{category}</legend>

            <input type="text" name={category + "_h"} inputMode="numeric"
              placeholder="HH" style={{ width: "4rem" }}
              value={formData[category + "_h"]?? ""} onChange={handleChange} />
            :
            <input type="text" name={category + "_m"} inputMode="numeric"
              placeholder="MM" style={{ width: "4rem" }}
              value={formData[category + "_m"]?? ""} onChange={handleChange} />
            :
            <input type="text" name={category + "_s"} inputMode="numeric"
              placeholder="SS" style={{ width: "5rem" }}
              value={formData[category + "_s"] ?? ""} onChange={handleChange} />

            <br />

            <input type="date" id="isoDate" name={category + "_setOn"}
              value={formData[category + "_setOn"] ?? ""} onChange={handleChange} />

            <span> </span>

            In Comp?
            <input type="checkbox" name={category + "_setInComp"}
              checked={formData[category + "_setInComp"] ?? false} onChange={handleChange} />
            
            <br />

            {errors[category] != null && errors[category].length != 0 && (
              <div className="card error small">
                {errors[category].map((e) => (
                  <>{e}</>
                ))}
              </div>
            )}
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
    </form>
  );
}

export default PuzzleForm;