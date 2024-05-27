import { BrowserRouter, Route,Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage"
import ServiceHomepage from "./pages/ServiceHomepage"
import AdminHomepage from "./pages/AdminHomepage"
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<LoginPage/>}></Route>
        <Route path="/services/login" exact element={<LoginPage worker={true}/>}></Route>
        <Route path="/services/homepage" exact element={<ServiceHomepage/>}></Route>
        <Route path="/services/admin/homepage" exact element={<AdminHomepage/>}></Route>
        <Route path="/services" exact element={<LoginPage worker={true}/>}></Route>
        <Route path="/homepage" exact element={<Homepage/>}></Route>
        <Route path="/signup" exact element={<SignUpPage/>}></Route>
        <Route path="*" exact element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
