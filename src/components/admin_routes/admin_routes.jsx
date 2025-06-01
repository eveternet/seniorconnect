import { Routes, Route } from "react-router-dom";

import Navbar from "./navbar/header";
import InterestGroup from "./interest_group/route";
import Home from "./home/home";
import NotFound from "./notfound";

export default function Admin_routes() {
    return (
        <>
            <div className="flex flex-row">
                <Navbar />
                <div className="w- ml-40">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/interest-groups/*"
                            element={<InterestGroup />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
