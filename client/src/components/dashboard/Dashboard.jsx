import Header from './Header';
import UrlShortener from './UrlShortener';
import UserStats from './UserStats';

const Dashboard = ({ user, onLogout }) => {
     return (
          <div className="dashboard">
               <Header user={user} onLogout={onLogout} />

               <main>
                    <UrlShortener />
                    <UserStats user={user} />
               </main>
          </div>
     );
};

export default Dashboard;