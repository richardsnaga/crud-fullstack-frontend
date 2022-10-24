import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.js";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./users/AddStock";
import EditUser from "./users/EditStock";
import ViewUser from "./users/ViewStock";
import Login from "./pages/Login";
import ProtectedRoutes from "./component/ProtectedRoutes";
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addstock" element={<AddUser />} />
            <Route exact path="/editstock/:id" element={<EditUser />} />
            <Route exact path="/viewstock/:id" element={<ViewUser />} />
          </Route>
          {/* <Route exact path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
