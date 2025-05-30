import { BrowserRouter, Routes, Route } from "react-router-dom";
import User_routes from "./components/user_routes/user_routes";
import Auth from "./components/middleware/auth";
function App() {
    return (
        <>
            <div className="min-h-screen bg-blue-200">
                <BrowserRouter>
                    <Auth />
                    <Routes>
                        <Route path="/*" element={<User_routes />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
