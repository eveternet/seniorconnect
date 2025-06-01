import { Routes, Route } from "react-router-dom";
import Listings from "./listing/listing";
import Edit from "./edit/edit";

export default function InterestGroupsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/:id" element={<Edit />} />
        </Routes>
    );
}
z;
