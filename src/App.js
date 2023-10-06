import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./components/homePage";
import Product from "./components/product";
import DetailProduct from "./components/detailProduct";
import AboutUs from "./components/aboutUs";
function App() {
  return (
   <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/product" element={<Product/>}/>
        <Route exact path="/product/:id" element={<DetailProduct/>}/>
        <Route exact path="/aboutus" element={<AboutUs/>}/>
      </Routes>
   </Router>
  );
}

export default App;
