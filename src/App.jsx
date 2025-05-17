import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/header";
import Interest from "./components/interest/interest";
import NotFound from "./components/404/notfound";
import Home from "./components/home/home";
function App() {
  return (
    <>
      <div className="min-h-screen bg-blue-200">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interest-groups" element={<Interest />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
