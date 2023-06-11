import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Route, Router, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./pages/users/AddUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import EditUser from "./pages/users/EditUser";
import ViewUser from "./pages/users/ViewUser";
import Navbar from "./layout/Navbar";
import Users from "./pages/users/Users";
import Players from "./pages/market/Players";
import Team from "./pages/Team/Team";
import Game from "./pages/game/Game";
import Schedule from "./pages/home/Schedule";


const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Schedule />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/players" element={<Players />} />
            <Route path="/team" element={<Team />} />
            <Route path="/game" element={<Game />} />
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;

