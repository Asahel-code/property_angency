import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRouter } from "./utils/routes";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  axios.defaults.withCredentials = true;
  //Assiging new variable to the array of routes
  const routes = useRouter();

  return (
    <div>
      <Router>
        <Header />
        <ToastContainer/>
        <Routes>
          {/* Checking if routes exsits in the array and map them out */}
          {routes &&
            routes.map((r) => (
              <Route exact key={r.path} path={r.path} element={r.element} />
            ))}
        </Routes>
        <FooterSection />
      </Router>
    </div>
  );
}

export default App;
