import React from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import ContactUs from "./pages/ContactUs";
import Dream from "./pages/Dream";
import LongEnquiry from "./pages/LongEnquiry";
import ShortEnquiry from "./pages/ShortEnquiry";
import Header from "./components/Header";
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/dream" element={<Dream />} />
          <Route path="/longEnquiry" element={<LongEnquiry />} />
          <Route path="/shortEnquiry" element={<ShortEnquiry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
