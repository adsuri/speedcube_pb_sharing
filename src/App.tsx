import "./App.css"
import { ADITYA } from "./cuber/MOCKCUBERS";
import PuzzleCard from "./puzzle/PuzzleCard";

function App() {
  return (
    <>
      {
        Object.entries(ADITYA.puzzles).map( // ex: ["222", Puzzle]
          puzzle => (puzzle[1] && <PuzzleCard puzzle={puzzle[1]}/>)
        )
      }
      <div className="container">
        <pre>{JSON.stringify(ADITYA, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;