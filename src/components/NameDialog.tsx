export default function NameDialog({
    onSubmit,
    isVisible,
}: {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isVisible: boolean;
}) {
    return (
        <div className="name-dialog" data-visible={isVisible}>
            <div className="container is-max-desktop">
                <form className="form" onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="playerName">Your name</label>
                    </div>
                    <div className="control">
                        <input
                            name="playerName"
                            className="is-primary"
                            type="text"
                            placeholder="Enter your name..."
                        ></input>
                    </div>
                    <button type="submit">Start</button>
                </form>
            </div>
        </div>
    );
}
