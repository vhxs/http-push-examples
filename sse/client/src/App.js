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
    const src = useRef(null);

    // getting CORS errors, need to fix...
    useEffect(() => {
        const evtSource = new EventSource("http://localhost:5000/stream", {withCredentials: false});
        src.current = evtSource

        return () => {
            evtSource.close();
        };
    }, []);

    useEffect(() => {
        if (!src.current) return;

        src.current.onmessage = e => {
            if (isPaused) return;
            const message = e.data;
            console.log(e);
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
