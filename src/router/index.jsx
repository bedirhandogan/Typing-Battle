import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "views/Home";
import 'assets/styles.css';
import {IconDeviceDesktop} from "@tabler/icons";

function Router() {
    return (
        <div className={"App"}>
            <div className={"screen-width-warning"}>
                <IconDeviceDesktop width={50} height={50} />
                Your screen size is small a larger screen size is required.
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;