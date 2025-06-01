import { BrowserRouter, Routes, Route } from "react-router-dom";
import User_routes from "./components/user_routes/user_routes";
import Admin_routes from "./components/admin_routes/admin_routes";
import Auth from "./components/middleware/auth";
import ScrollToTop from "./components/middleware/scroll";
function App() {
    return (
        <>
            <div className="min-h-screen">
                <BrowserRouter>
                    <ScrollToTop />
                    <Auth />
                    <Routes>
                        <Route path="/*" element={<User_routes />} />
                        <Route path="/admin/*" element={<Admin_routes />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
