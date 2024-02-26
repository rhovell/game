import '../styles/Navbar.css';

function NavBar({ runTurn }) {
    return (
        <div className="controls">
            <div className="attack">
                <button onClick={runTurn}>Run Test</button>
            </div>
        </div>
    );
}

export default NavBar;
