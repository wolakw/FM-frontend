import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
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
import ClubsTable from "./pages/Table/ClubsTable";
import React, {useEffect} from "react";
import GamesClub from "./pages/game/GamesClub";
import ViewGame from "./pages/game/ViewGame";
import GuestOutlet from "./router/GuestRouting";
import Register from "./pages/login/Register";
import {useAuth} from "./context/AuthContext";
import UserOutlet from "./router/UserRouting";


const queryClient = new QueryClient();

function App() {
    const {me} = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            me(token);
        }
    }, []);
  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/" element={<UserOutlet/>}>
            <Route path="/" element={<Schedule />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/players" element={<Players />} />
            <Route path="/team" element={<Team />} />
            <Route path="/table" element={<ClubsTable />} />
            <Route path="/games" element={<GamesClub />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/viewgame/:id" element={<ViewGame />} />
            </Route>

            <Route path="/" element={<GuestOutlet/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;

