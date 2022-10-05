import {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRouter } from "./utils/routes";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import {clearErrorMessage} from './redux/message-modal/errorMessageModalSlice';
import { clearSuccessMessage } from './redux/message-modal/successMessageModalSlice';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSuccessMessage());
    dispatch(clearErrorMessage());
  },[dispatch]);

  axios.defaults.withCredentials = true;
  //Assiging new variable to the array of routes
  const routes = useRouter();

  return (
    <div>
      <Router>
        <Header />
        <ToastContainer />
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
