import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChatRoom from "./pages/chat-room";
import ChooseRoom from "./pages/choose-room";
import {Provider} from "react-redux";
import store from "./store";
export const App = () => {
    return (
        <Provider store={store}>
        <Router>
            <Routes>
                <Route exact path="/" element={<ChooseRoom />} />
                <Route path="/room/:roomId" element={<ChatRoom />} />
            </Routes>
        </Router>
        </Provider>
    )
};

export default App;