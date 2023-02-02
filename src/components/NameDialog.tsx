export default function NameDialog({
    onSubmit,
    isVisible,
}: {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isVisible: boolean;
}) {
    return (
        <div className="name-dialog" data-visible={isVisible}>
            <div className=" content box is-max-desktop">
                <form className="form" onSubmit={onSubmit}>
                    <div className="field">
                        <label className="label is-large" htmlFor="playerName">Your name</label>
                    </div>
                    <div className="control row">
                        <input
                            name="playerName"
                            className="input is-primary is-medium"
                            type="text"
                            placeholder="Enter your name..."
                        ></input>
						<button type="submit" className="button is-medium is-primary">Start</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
