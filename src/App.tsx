import { useState } from "react";
import "./App.css";
import BingoBoard from "./components/BingoBoard";
import BoardControls from "./components/BoardControls";
import LuckyNumbers from "./components/LuckyNumbers";
import { getRandomInt } from "./utilities";
import NavBar from "./components/NavBar";
import NameDialog from "./components/NameDialog";

/**
 * Creates the numbers for the board of this game.
 * @returns number[]
 */
export function createBoard() {
    // we use a Set() because it allows for only unique values
    const board = new Set<number>();

    // recursively called for each new column
    function nextColumn(min: number) {
        let cells = 0;
        let max = min + 14;

        while (cells < 5 && board.size < min + 4) {
            // generate a random number
            const int = getRandomInt(min, max);

            // add to the board	if it's not already there
            if (!board.has(int)) {
                board.add(int);
                cells++;
            }
        }

        if (board.size < 25) nextColumn(max + 1);
    }

    nextColumn(1);

	// return result as an array
    return [...board];
}

function App() {

    const [player, setPlayer] = useState("");
    const [board, setBoard] = useState(createBoard());
    const [hasWon, setHasWon] = useState(false);
    const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);
    const [count, setCount] = useState(0);

    /**
     * Creates a new random unique number between 1 and 75
     * Updates bingo card match count
     * Checks if user has a full bingo card
     *
     * @returns void
     */
    function rollDiceHandler() {
        // Congrats!!
        if (hasWon) return;

        // ensure a unique number
        const luckyNumber = (() => {
            const getNum = (): number => {
                let num = getRandomInt(1, 75);
                if (luckyNumbers.includes(num)) return getNum();
                return num;
            };
            return getNum();
        })();

        const number = luckyNumber;

        // update list
        setLuckyNumbers((luckyNumbers) => {
            return [...luckyNumbers, number];
        });

        // check if we have a winner
        if (board.includes(number)) setCount(count + 1);

        // mark as winner (or loser)
        setHasWon(count === 24);
    }

    function newGameHandler() {
        setHasWon(false);
        setBoard(createBoard);
        setLuckyNumbers([]);
        setCount(0);
    }

    function setPlayerHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const el = form.elements[0] as HTMLInputElement;
        setPlayer(el.value);
    }

    return (
        <div className="App container">
            <main className="container block box">
                <NavBar name={player}></NavBar>
                <BingoBoard
                    luckyNums={luckyNumbers}
                    hasWon={hasWon}
                    board={board}
                ></BingoBoard>
                <BoardControls
                    rollDice={rollDiceHandler}
                    newGame={newGameHandler}
                ></BoardControls>
                <LuckyNumbers luckyNums={luckyNumbers}></LuckyNumbers>
            </main>
            <NameDialog
                onSubmit={setPlayerHandler}
                isVisible={player.length === 0}
            ></NameDialog>
        </div>
    );
}

export default App;
