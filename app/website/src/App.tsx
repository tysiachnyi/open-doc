import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ViewDocumentation from "./routes/ViewDocumentation/ViewDocumentation";
import CreateDocumentation from "./routes/CreateDocumentation/CreateDocumentation";
import ListProjects from "./routes/ListProjects/ListProjects";
import CreateProject from "./routes/CreateProject/CreateProject";
import ViewProject from "./routes/ViewProject/ViewProject";
import Profile from "./routes/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        {/* Protected Routes START */}
        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTES.LIST_PROJECTS} element={<ListProjects />} />
          <Route path={ROUTES.CREATE_PROJECT} element={<CreateProject />} />
          <Route
            path={`${ROUTES.VIEW_PROJECT}/:id`}
            element={<ViewProject />}
          />
          <Route
            path={ROUTES.VIEW_DOCUMENTATION}
            element={<ViewDocumentation />}
          />
          <Route
            path={ROUTES.CREATE_DOCUMENTATION}
            element={<CreateDocumentation />}
          />
        </Route>
        {/* Protected Routes END */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
