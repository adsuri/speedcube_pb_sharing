import { Puzzle } from "./Puzzle";
import { PBest, type PBestInit } from "./PBest";

import { useState } from "react";

import { CATEGORIES } from "../CONSTANTS";
import { convertTime,
         isNumericOrEmpty,
         isIntegerOrEmpty,
         isISODateOrEmpty,
         hmsToSeconds } from "../util";

export interface PuzzleFormProps {
  puzzle: Puzzle;
  onSave: (p: Puzzle) => void;
  onCancel: () => void
}

type FormData = Record<string, any>;
type ErrorData = Record<string, string[]>;

function PuzzleForm(
  { puzzle, onSave, onCancel }: PuzzleFormProps
) {
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
          if (Array.isArray(record.score)) {
            newData[category + "_solved"] = record.score[0][0];
            newData[category + "_attempted"] = record.score[0][1];
            if (record.score[1] == 0) {
              newData[category + "_h"] = "";
              newData[category + "_m"] = "";
              newData[category + "_s"] = "";
            } else {
              let convertedTime = convertTime(Number(record.score[1]));
              newData[category + "_h"] = convertedTime[1];
              newData[category + "_m"] = convertedTime[2];
              newData[category + "_s"] = convertedTime[3];
            }
          }
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

  const validate = (data: FormData): ErrorData => {
    let newErrorData: ErrorData = {};

    for (const category of CATEGORIES) {
      if (puzzle.name == "mbld") { // mbld validation
        newErrorData[category] = []

        let validScore: boolean = true;

        const solved: string = data[category + "_solved"];
        const attempted: string = data[category + "_attempted"];

        const solvedEmpty = solved == "";
        const attemptedEmpty = attempted == "";

        if (!isIntegerOrEmpty(solved) || !isIntegerOrEmpty(attempted)) {
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
            continue
          } else if (!isNumericOrEmpty(hours) || !isNumericOrEmpty(minutes) || !isNumericOrEmpty(seconds)) {
            newErrorData[category].push("Please enter a valid duration");
          }
        }
      } else if (puzzle.name == "fmc") { // fmc validation
        newErrorData[category] = []

        const moves: string = data[category + "_moves"];

        if (!isIntegerOrEmpty(moves)) {
          newErrorData[category].push("Please enter a valid number of moves...");
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

      if (!isISODateOrEmpty(data[category + "_setOn"]) && data[category + "_setOn"] != "") {
        newErrorData[category].push("Please enter an ISO date format...")
      }
    }

    setErrors(newErrorData);
    return newErrorData;
  };

  const isValid = (): boolean => {
    const errorData = validate(formData);

    return Object.values(errorData).every(
      errors => errors.length == 0
    );
  };

  const handleChange = (event: any): void => {
    const { name, value, type, checked } = event.target;

    const newData: FormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value
    };

    setFormData(newData);
    validate(newData);
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();

    if (!isValid()) return;

    let newRecords: Record<string, PBestInit | null> = {};

    for (const category of CATEGORIES) {
      const setOn: Date | undefined =
        formData[category + "_setOn"] !== ""
          ? (() => {
              const [year, month, day]: [string, string, string] = formData[category + "_setOn"].split("-").map(Number);

              return new Date(Number(year), Number(month) - 1, Number(day));
            })()
          : undefined;

      const setInComp: boolean = formData[category + "_setInComp"];

      if (puzzle.name == "mbld") { // mbld puzzle object
        let solved: string = formData[category + "_solved"];
        let attempted: string = formData[category + "_attempted"];
        let hours: string = formData[category + "_h"];
        let minutes: string = formData[category + "_m"];
        let seconds: string = formData[category + "_s"];

        if ((solved == "" && attempted == "")
          || (Number(solved) == 0 && Number(attempted) == 0)
        ) {
          newRecords[category] = null;
        } else {
          let newDuration: number;

          if ((hours == "" && minutes == "" && seconds == "")
            || hmsToSeconds(hours, minutes, seconds) == 0
          ) {
            newDuration = 0;
          } else {
            newDuration = hmsToSeconds(hours, minutes, seconds);
          }

          newRecords[category] = {
            score: [[Number(solved), Number(attempted)], newDuration],
            setOn: setOn,
            setInComp: setInComp
          };
        }

      } else if (puzzle.name == "fmc") { // fmc puzzle object
        let moves: string = formData[category + "_moves"];

        if (moves == "" || Number(moves) == 0) {
          newRecords[category] = null;
        } else {
          newRecords[category] = {
            score: Number(moves),
            setOn: setOn,
            setInComp: setInComp
          };
        }

      } else { // regular puzzle object
        let hours: string = formData[category + "_h"];
        let minutes: string = formData[category + "_m"];
        let seconds: string = formData[category + "_s"];

        if ((hours == "" && minutes == "" && seconds == "")
          || (Number(hours) == 0 && Number(minutes) == 0 && Number(seconds) == 0)
        ) {
          newRecords[category] = null;
        } else {
          newRecords[category] = {
            score: hmsToSeconds(hours, minutes, seconds),
            setOn: setOn,
            setInComp: setInComp
          };
        }
      }
    }

    const newPuzzle = new Puzzle({
      name: puzzle.name,
      currMain: formData["currMain"] == "" ? null : formData["currMain"],
      records: newRecords
    });

    onSave(newPuzzle);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Current Main</legend>
        <input type="text" name="currMain" placeholder="Enter current main..."
          value={formData["currMain"] ?? ""} onChange={handleChange} />
      </fieldset>

      {
        CATEGORIES.map((category: string) => (
          <fieldset key={category}>
            <legend>{category}</legend>

            {
              puzzle.name == "mbld"
                ? (
                  <>
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
                  </>
                )
              : puzzle.name == "fmc"
                ? (
                  <>
                    <input type="text" name={category + "_moves"} inputMode="numeric"
                      placeholder="Moves..." style={{ width: "6rem" }}
                      value={formData[category + "_moves"] ?? ""} onChange={handleChange} />

                    <br />
                  </>
                )
              : (
                <>
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
                </>
              )
            }

            <input type="date" id="isoDate" name={category + "_setOn"}
              value={formData[category + "_setOn"] ?? ""} onChange={handleChange} />
            
            <span className="spacer"> </span>

            In Comp?
            <input type="checkbox" name={category + "_setInComp"}
              checked={formData[category + "_setInComp"] ?? false} onChange={handleChange} />

            <br />

            {
              errors[category] != null && errors[category].length != 0 &&
              (
                <section>
                  {
                    errors[category].map((e: string, i: number) => (
                      <div className="card error fluid" key={i}>{e}</div>
                    ))
                  }
                </section>
              )
            }
          </fieldset>
        ))
      }

      <div className="input-group fluid">
        <button className="primary large">
          Save
        </button>
        <span />
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PuzzleForm;