import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/header";
import Interest from "./components/interest/interest";
import NotFound from "./components/404/notfound";
import Home from "./components/home/home";
import SignIn from "./components/signin/signin";
function App() {
  return (
    <>
      <div className="min-h-screen bg-blue-200">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interest-groups" element={<Interest />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
