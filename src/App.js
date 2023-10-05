import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./components/homePage";
import Product from "./components/product";
import DetailProduct from "./components/detailProduct";
function App() {
  return (
   <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/product" element={<Product/>}/>
        <Route exact path="/product/:id" element={<DetailProduct/>}/>
      </Routes>
   </Router>
  );
}

export default App;
