import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./users/AddUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;
