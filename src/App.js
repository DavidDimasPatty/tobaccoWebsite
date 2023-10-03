import { Router } from "express";

function App() {
  return (
   <Router>
      <Routes>
        <Route exact path="/" element={<homePage/>}/>
      </Routes>
   </Router>
  );
}

export default App;
