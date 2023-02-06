export default function BoardControls({
    rollDice,
    newGame,
	buttonActive
}: {
	rollDice: (event: React.MouseEvent<HTMLElement>) => void;
    newGame: (event: React.MouseEvent<HTMLElement>) => void;
	buttonActive: boolean
}) {
    return (
        <section className="board-controls-container">
            <button onClick={rollDice} disabled={!buttonActive} className="button is-primary">
                Roll dice
            </button>
            <button onClick={newGame} className="button is-secondary">
                Try your luck in a new game
            </button>
        </section>
    );
}
