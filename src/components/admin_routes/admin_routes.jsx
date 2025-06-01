import { Routes, Route } from "react-router-dom";
import AdminAuth from "./admin_auth";
import Navbar from "./navbar/header";
import InterestGroup from "./interest_group/route";
import Home from "./home/home";
import NotFound from "./notfound";

export default function Admin_routes() {
    return (
        <>
            <AdminAuth />
            <div className="flex flex-row">
                <Navbar />
                <div className="ml-60 w-full bg-blue-300">
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
