import { Routes, Route } from "react-router-dom";
import LandingPage from "./landing/interest";
import InterestGroup from "./interest_group/group";

export default function InterestGroupsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:id" element={<InterestGroup />} />
            {/* Add more nested routes here if needed */}
        </Routes>
    );
}
