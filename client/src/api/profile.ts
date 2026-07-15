import { Cuber } from "../cuber/Cuber";
import { type PuzzleInit } from "../puzzle/Puzzle";
import { type PBestInit } from "../puzzle/PBest";
import { PUZZLES } from "../CONSTANTS";
import { API_URL } from "./API_CONSTANTS";

export interface GrabUserResponse {
  publicId: string;
  name: string | null;
  pictureURL: string | null;
  isOwner: boolean;
  puzzles: {
    name: string;
    currMain: string | null;
    records: {
      category: string;
      scoreJson: string;
      setOn: string | null;
      setInComp: boolean;
    }[];
  }[];
}

export async function grabUser(jwtToken: string | null, publicId: string): Promise<[boolean, Cuber]> {
  const response = await fetch(API_URL + "/users/" + publicId, {
    method: "GET",
    headers: jwtToken != null ? {
      authorization: `Bearer ${jwtToken}`
    } : {}
  });

  if (response.status == 404) {
    throw new Error("This user does not exist...");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user...");
  }

  const data: GrabUserResponse = await response.json();

  const puzzles: Record<string, PuzzleInit | null> = {};

  for (const p of PUZZLES) {
    puzzles[p] = null;
  }

  for (const puzzle of data.puzzles) {
    const records: Record<string, PBestInit | null> = {};

    for (const record of puzzle.records) {
      records[record.category] = {
        score: JSON.parse(record.scoreJson),
        setOn: record.setOn ? new Date(record.setOn) : undefined,
        setInComp: record.setInComp ?? false
      };
    }

    puzzles[puzzle.name] = {
      name: puzzle.name,
      currMain: puzzle.currMain ?? undefined,
      records: records
    };
  }

  const cuber = new Cuber({
    publicId: data.publicId,
    name: data.name ?? undefined,
    pictureURL: data.pictureURL ?? undefined,
    puzzles: puzzles
  });

  return [data.isOwner, cuber];
}
