import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import store, { history } from './redux';
import { Provider } from "react-redux";
import App from "./pages/App";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import { HistoryRouter } from "redux-first-history/rr6";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HistoryRouter history={history}>
            <Routes>
                <Route path='/' exact element={<App/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path='/*' exact element={<NotFound/>}/>
            </Routes>
        </HistoryRouter>
    </Provider>
);