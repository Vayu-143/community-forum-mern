import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DiscussionDetails from "./pages/DiscussionDetails";
import CreateDiscussion from "./pages/CreateDiscussion";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-discussion"
          element={<CreateDiscussion />}
        />

        <Route
          path="/discussion/:id"
          element={<DiscussionDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  );
}

export default App;