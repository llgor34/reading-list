import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {user && <Home />}
                  {!user && <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  {!user && <Signup />}
                  {user && <Navigate to="/" />}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {!user && <Login />}
                  {user && <Navigate to="/" />}
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
