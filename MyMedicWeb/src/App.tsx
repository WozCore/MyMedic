import Message from "./message";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Catalog from "./Lists/Catalog";
import ProductDetail from "./Cards/ProductDetail";
import CatalogMainList from "./Lists/CatalogMainList";
function App(){
  return ( 
     <Router>
    <div className="App">
      <Routes>
      <Route path="/catalog" element={<CatalogMainList />} />
       
      <Route path="/product/:id" element={<ProductDetail />} />
   
        <Route path="/" element={<Hero></Hero>} />
        <Route path="/catalog/:id" element={<Catalog />} />
       
      </Routes>
     
     
    </div>
  </Router>
);
}
export default App;