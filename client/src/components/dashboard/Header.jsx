const Header = ({ user, onLogout }) => {
     return (
          <header>
               <h1>ShortX</h1>
               <div>
                    <span>Welcome, {user.name}</span>
                    <button onClick={onLogout}>Logout</button>
               </div>
          </header>
     );
};

export default Header;