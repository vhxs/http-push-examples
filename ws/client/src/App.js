// *really* simple example of browser client subscribing the reddit comments via websocket
// this is how a server can push state to a web client
// things like push notification etc

// use create-react-app to create a React application
// replace src/App.js with the contents of this file
// then run the app with `npm start` and `ws_server.py` running
// and open a web console. You should see reddit comments printed live in the console

// ripped and modified from here: https://stackoverflow.com/a/60161181

import './App.css';
import React, {useEffect, useRef, useState} from 'react';

function App() {
    const [isPaused, setPause] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8765");
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = e.data;
            console.log(message);
        };
    }, [isPaused]);

    return (
        <div>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
}


export default App;
