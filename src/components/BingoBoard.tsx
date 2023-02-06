export default function BingoBoard({
    luckyNums,
    board,
    hasWon,
}: {
    luckyNums: number[];
    board: number[];
    hasWon: boolean;
}) {
    const drawBoard = () => {
        return board.map((item, index) => {
            return (
                <div
                    className="cell"
                    key={index}
                    data-value={item}
                    data-match={luckyNums.includes(item)}
                >
                    {item}
                </div>
            );
        });
    };

    return (
        <section id="bingo-board" className="block">
            <header>
                <span>B</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>O</span>
            </header>
            <div className="board-container">{drawBoard()}</div>
            <div className="has-won" data-haswon={hasWon}>
                <span className="title">You won!</span>
            </div>
        </section>
    );
}
