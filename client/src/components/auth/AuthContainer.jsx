import { useState } from 'react';
import AuthToggle from './AuthToggle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { INITIAL_FORM_DATA } from '../../constants/formOptions';

const AuthContainer = ({ onLogin, onSignup, loading, error }) => {
     const [isLogin, setIsLogin] = useState(true);
     const [formData, setFormData] = useState(INITIAL_FORM_DATA);

     const handleInputChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (isLogin) {
               const result = await onLogin({
                    email: formData.email,
                    password: formData.password
               });
               if (result.success) {
                    setFormData(INITIAL_FORM_DATA);
               }
          } else {
               const result = await onSignup(formData);
               if (result.success) {
                    setIsLogin(true);
                    setFormData(INITIAL_FORM_DATA);
                    alert('Signup successful! Please login.');
               }
          }
     };

     return (
          <div className="auth-container">
               <div className="auth-box">
                    <h1>ShortX</h1>
                    <p>Official Link-Shortening tool for SJCET</p>

                    <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

                    {error && <div className="error">{error}</div>}

                    {isLogin ? (
                         <LoginForm
                              formData={formData}
                              handleInputChange={handleInputChange}
                              onSubmit={handleSubmit}
                              loading={loading}
                         />
                    ) : (
                         <SignupForm
                              formData={formData}
                              handleInputChange={handleInputChange}
                              onSubmit={handleSubmit}
                              loading={loading}
                         />
                    )}
               </div>
          </div>
     );
};

export default AuthContainer;