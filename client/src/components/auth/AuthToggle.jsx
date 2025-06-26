const AuthToggle = ({ isLogin, setIsLogin }) => {
     return (
          <div className="auth-toggle">
               <button
                    className={isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(true)}
               >
                    Login
               </button>
               <button
                    className={!isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(false)}
               >
                    Sign Up
               </button>
          </div>
     );
};

export default AuthToggle;