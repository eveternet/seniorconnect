import { Routes, Route } from "react-router-dom";
import LandingPage from "./landing/interest";

export default function InterestGroupsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Add more nested routes here if needed */}
        </Routes>
    );
}
