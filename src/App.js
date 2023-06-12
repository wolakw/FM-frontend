import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./users/AddUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";
import {useAuth} from "./context/AuthContext";
import Register from "./pages/login/Register";
import EventHandler from "bootstrap/js/src/dom/event-handler";
import UserOutlet from "./router/UserRouting";
import GuestOutlet from "./router/GuestRouting";

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
            <Route path="/" element={<Home />} />
                <Route path="/add-user" element={<AddUser />} />
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
