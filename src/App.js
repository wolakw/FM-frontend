import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Route, Router, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./pages/users/AddUser";
import Match from "./pages/match/Match";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import EditUser from "./pages/users/EditUser";
import ViewUser from "./pages/users/ViewUser";
import Navbar from "./layout/Navbar";
import Users from "./pages/users/Users";
import Players from "./pages/players/Players";
import Team from "./pages/players/Team";
import Game from "./pages/game/Game";
import {Calender} from "./pages/home/Calender";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Calender />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/match" element={<Match />} />
            <Route path="/players" element={<Players />} />
            <Route path="/team" element={<Team />} />
            <Route path="/game" element={<Game />} />
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;

