export default function LuckyNumbers({ luckyNums }: { luckyNums: number[] }) {
    function renderLuckyNumbers() {
        return luckyNums.map((val, index) => {
            return <li key={index}>{val}</li>;
        });
    }

    return (
        <section className="lucky-numbers-container">
            <h3 className="title">Lucky numbers</h3>
            <ul>{renderLuckyNumbers()}</ul>
        </section>
    );
}
