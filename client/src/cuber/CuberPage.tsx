import { Puzzle } from "../puzzle/Puzzle";
import { Cuber } from "./Cuber";

import PuzzleList from "../puzzle/PuzzleList";

import { useState } from "react";
import { useEffect } from "react";

import { CATEGORIES, PUZZLES } from "../CONSTANTS";
import { postPuzzle, deletePuzzle } from "../api/profile";
import { getToken } from "../api/storage";

export interface CuberPageProps {
  user: Cuber,
  isOwner: boolean
};

function CuberPage(
  { user: initialUser, isOwner }: CuberPageProps
) {
  const [user, setUser] = useState<Cuber>(initialUser);
  const [copied, setCopied] = useState<boolean>(false);

  const puzzleList: Puzzle[] = PUZZLES.map((p) => user.puzzles[p])
    .filter((p): p is Puzzle => p != null);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleCopyLink = async (): Promise<void> => {
    const profileUrl = `${window.location.origin}/users/${user.publicId}`;

    await navigator.clipboard.writeText(profileUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSavePuzzleAllowEmpty = (newPuzzle: Puzzle): void => {
    setUser((prev) => ({
      ...prev,
      puzzles: {
        ...prev.puzzles,
        [newPuzzle.name]: newPuzzle
      }
    })); 
  };

  const handleSavePuzzle = (newPuzzle: Puzzle): void => {
    setUser((prev) => {
      const tempPuzzles: Record<string, Puzzle | null> = prev.puzzles;

      const hasAnyCategory: boolean = CATEGORIES.some(
        (c) => newPuzzle.records[c] != null
      );

      if (hasAnyCategory) {
        tempPuzzles[newPuzzle.name] = newPuzzle;
        postPuzzle(getToken(), user.publicId, newPuzzle);
      } else {
        tempPuzzles[newPuzzle.name] = null;
        deletePuzzle(getToken(), user.publicId, newPuzzle.name);
      }

      return {
        ...prev,
        puzzles: tempPuzzles
      };
    });
  };

  const handleDelete = (p: Puzzle): void => {
    setUser((prev) => ({
      ...prev,
      puzzles: {
        ...prev.puzzles,
        [p.name]: null
      }
    }));

    deletePuzzle(getToken(), user.publicId, p.name);
  };

  return (
    <div className="cuberpage">
      <section className="cuberpage-header">
        <img src={user.pictureURL ?? ""}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            flexShrink: 0
          }} />

        <div>
          <h1 style={{ margin: "0" }}>{user.name}</h1>
          <h4 style={{ margin: "0.25rem 0 " }}>
            ID: {user.publicId} <span> </span>
            <button
              className="small rounded"
              onClick={handleCopyLink}
              style={{textAlign: "left", margin: 0}}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </h4>
        </div>
      </section>

      <PuzzleList puzzles={puzzleList}
        onSave={handleSavePuzzle}
        onSaveAllowEmpty={handleSavePuzzleAllowEmpty}
        onDelete={handleDelete} isOwner={isOwner} />
    </div>
  );
}

export default CuberPage;