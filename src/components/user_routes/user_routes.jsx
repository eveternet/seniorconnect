import { Routes, Route } from "react-router-dom";
import NotFound from "./404/notfound";
import Home from "./home/home";
import InterestGroups from "./interest/routes";
import SignIn from "./signin/signin";
import SignUp from "./signin/signup";
import Navbar from "./navbar/navbar"; // Assuming you have a Navbar

export default function UserRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                {/* <Route path="chat" element={<Chat />} /> */}
                {/* <Route path="events" element={<Events />} /> */}
                <Route path="interest-groups/*" element={<InterestGroups />} />
                {/* <Route path="notifications" element={<Notifications />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
