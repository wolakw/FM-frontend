import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import AddUser from "./users/AddUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import StartTraining from "./training/StartTraining";
import IndividualTraining from "./training/IndividualTraining";

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
            <Route path="/start-training" element={<StartTraining />} />
            <Route path="/individual-training" element={<IndividualTraining />} />
        </Routes>

    </div>
          </QueryClientProvider>
  );
}

export default App;
