export default function BoardControls({
    rollDice,
    newGame,
}: {
    rollDice: (event: React.MouseEvent<HTMLElement>) => void;
    newGame: (event: React.MouseEvent<HTMLElement>) => void;
}) {
    return (
        <section className="board-controls-container">
            <button onClick={rollDice} className="button is-primary">
                Roll dice
            </button>
            <button onClick={newGame} className="button is-secondary">
                Try your luck in a new game
            </button>
        </section>
    );
}
