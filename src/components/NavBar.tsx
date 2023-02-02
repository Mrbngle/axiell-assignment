export default function NavBar({ name }: { name: string }) {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="player-name">
                <strong>Player name: </strong> {name}
            </div>
            <div className="navbar-brand">
                <a className="navbar-item" href="https://axiell.com">
                    <img src="https://www.axiell.com/app/themes/axiell/dist/images/logo_b3660c53.svg" />
                </a>
            </div>
        </nav>
    );
}
