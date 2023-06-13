import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./pages/users/AddUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";
import {useAuth} from "./context/AuthContext";
import Register from "./pages/login/Register";
import EventHandler from "bootstrap/js/src/dom/event-handler";
import UserOutlet from "./router/UserRouting";
import GuestOutlet from "./router/GuestRouting";
import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import ViewUser from "./pages/users/ViewUser";
import Players from "./pages/market/Players";
import Team from "./pages/Team/Team"
import ClubsTable from "./pages/Table/ClubsTable"
import GamesClub from "./pages/game/GamesClub"
import Game from "./pages/game/Game"
import ViewGame from "./pages/game/ViewGame"
import Schedule from "./pages/home/Schedule";
import StartTraining from "./training/StartTraining";
import IndividualTraining from "./training/IndividualTraining";
import _IndividualTraining from "./training/_IndividualTraining";
import TeamTraining from "./training/TeamTraining";
import Clubs from "./pages/clubs/Clubs";
import ViewClub from "./pages/clubs/ViewClub";
import EditClub from "./pages/clubs/EditClub";
import {Misc} from "./Misc/Misc";
import {AddPlayer} from "./Misc/AddPlayer";
import {axiosConfig, setupAxios} from "./api/setupAxios";
import Logout from "./pages/logout/Logout";
import AdminOutlet from "./router/AdminRouting";

const queryClient = new QueryClient();

function App() {
    const {me,user} = useAuth();
    console.log(user)

    useEffect(() => {
        const token = localStorage.getItem("token");
        setupAxios(token);
        if (token) {
            me(token);
        }
    }, []);
  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
      {/*<Navbar />*/}
        <Routes>
            <Route path="/" element={<UserOutlet/>}>
                <Route path="/" element={<Schedule />} />
                <Route path="/add-user" element={<AddUser />} />
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
                <Route path="/start-training" element={<StartTraining />} />
                <Route path="/individual-training" element={<IndividualTraining />} />
                <Route path="/individual-training/:id" element={<_IndividualTraining />} />
                <Route path="/team-training" element={<TeamTraining />} />
                <Route path="/logout" element={<Logout />} />
            </Route>

            <Route path="/" element={<AdminOutlet/>}>
                <Route path="/" element={<Schedule />} />
                <Route path="/users" element={<Users />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/edituser/:id" element={<EditUser />} />
                <Route path="/viewuser/:id" element={<ViewUser />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/viewclub/:id" element={<ViewClub />} />
                <Route path="/editclub/:id" element={<EditClub />} />
                <Route path="/misc" element={<Misc />} />
                <Route path="/add-player" element={<AddPlayer />} />
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
