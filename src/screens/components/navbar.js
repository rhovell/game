import '../styles/Navbar.css';

function NavBar({ runTurn, playersTurn }) {
    return (
        <div className="controls" style={{justifyContent: playersTurn === true ? 'flex-start' : 'flex-end'}}>
            <div className="attack" >
                <button onClick={runTurn}>Attack!</button>
                {/* <button onClick={runTurn}>Run Whole Match</button> */}

            </div>
        </div>
    );
}

export default NavBar;
