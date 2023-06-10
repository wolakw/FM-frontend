import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./users/AddUser";
import Match from "./pages/match/Match";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/match" element={<Match />} />
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;
