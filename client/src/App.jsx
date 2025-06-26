import './App.css';
import { useAuth } from './hooks/useAuth';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/dashboard/Dashboard';

function App() {
     const { user, loading, error, login, signup, logout } = useAuth();

     if (user) {
          return <Dashboard user={user} onLogout={logout} />;
     }

     return (
          <AuthContainer
               onLogin={login}
               onSignup={signup}
               loading={loading}
               error={error}
          />
     );
}

export default App;