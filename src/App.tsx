import { useEffect, useState } from "react";
import "./App.css";
import BingoBoard from "./components/BingoBoard";
import BoardControls from "./components/BoardControls";
import LuckyNumbers from "./components/LuckyNumbers";
import { getRandomInt } from "./utilities";
import NavBar from "./components/NavBar";
import NameDialog from "./components/NameDialog";

type Board = number[][];

interface ScoreBoard {
    rows: Board;
    columns: Board;
}

/**
 * Create a bingo board where each subsequent column is represented by
 * a new array containing random numbers within a range of 15
 *
 * @returns number[][]
 */
function createBingoBoard(): Board {
    const board: number[][] = [];

    // the minimum value
    let min = 1;

    // create the columns
    for (let i = 0; i < 5; i++) {
        // set constraint
        const max = min + 14;

        // create a new array to contain the cells for this column
        if (!board[i]) board[i] = [];

        // create the cells for this column
        for (let j = 0; j < 5; j++) {
            // come up with a random number
            let num = getRandomInt(min, max);

            // generate new nunbers until a new unique number has been found
            while (board[i].includes(num)) {
                num = getRandomInt(min, max);
            }

            // add num to bourd
            board[i][j] = num;
        }

        // add 15 before we proceed to the next column
        min += 15;
    }

    // done
    return board;
}

/**
 * Creates the scoreboard.
 *
 * To be able to see if user has full column or full row,
 * we will create a seperate scoreboard.
 */
function createScoreBoard(bingoBoard: Board): ScoreBoard {
    // create an array for each column
    // (we can simply use the normal bingo board)
    const columns = [...bingoBoard];

    // create an array with arrays for each column
    const rows = [];

    // create the rows from the columns
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(columns[j][i]);
        }

        rows[i] = row;
    }

    return {
        columns,
        rows,
    };
}

/**
 * Will try to find the supplied lucky number on either the rows
 * or the columns on the current scoreboard. When the number matches with
 * a number from a column or row the board, we will remove that item
 * from its corresponding array.
 *
 * If the user ends up with an empty array (either in columns or rows),
 * he wins!
 *
 * Returns true if user has won.
 *
 * @param scoreBoard
 * @param luckyNumber
 */
function reduceScoreBoard(
    scoreBoard: ScoreBoard,
    luckyNumber: number,
    callback: (score: ScoreBoard, hasWon: boolean) => void
) {
    let hasWon = false;

    /**
     * This took me a while. Because the ScoreBoard is based of
     * the BingoBoard, it kept removing items from the actual board
     * as well. This function seems to do the trick.
     */
    const removeValue = (arr: number[], index: number) => {
        return arr.slice(0, index).concat(arr.slice(index + 1));
    };

    function findAndRemoveMatch(arr: Board) {
        arr.forEach((curr, index) => {
            // find and remove winning item from array
            let idx = curr.indexOf(luckyNumber);
            if (idx > -1) arr[index] = removeValue(curr, idx);

            // if we endup with zero items, it means that user won
            if (arr[index].length === 0) hasWon = true;
        });

        return arr;
    }

    // check for both columns and rows
    const columns = findAndRemoveMatch(scoreBoard.columns);
    const rows = findAndRemoveMatch(scoreBoard.rows);

    // execute callback
    callback({ columns, rows }, hasWon);
}

/**
 * Create a new board.
 */
function createBoard() {
    const board = createBingoBoard();
    const scoreBoard = createScoreBoard([...board]);

    return {
        board,
        scoreBoard,
    };
}

let scoreBoard: ScoreBoard;

function App() {
    const [player, setPlayer] = useState("");
    const [board, setBoard] = useState<Board>([]);
    const [hasWon, setHasWon] = useState(false);
    const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

    /**
     * Resets the game
     */
    function newGameHandler() {
        setHasWon(false);

        const newBoard = createBoard();

        scoreBoard = newBoard.scoreBoard;
        setBoard(newBoard.board);

        // reset the lucky numbers
        setLuckyNumbers([]);
    }

    useEffect(() => {
        // init game
        newGameHandler();
    }, []);

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

        if (scoreBoard) {
            reduceScoreBoard(scoreBoard, number, (updatedBoard, winner) => {
                scoreBoard = updatedBoard;
                if (winner) setHasWon(true);
            });
        }
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
                    board={[...board.flat()]}
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
