import { useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Context } from ".";
import { check } from "./http/userApi";
import "./styles/Loader.css";
import './styles/Auth.css';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      if (data){
        user.setUser(data);
        user.setAuth(true);
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading){
    return <div className="container">
              <div className="loader"></div>
            </div>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
