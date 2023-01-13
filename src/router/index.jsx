import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../views/Home";
import '../assets/styles.css';

function Router() {
    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;