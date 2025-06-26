import { useState } from 'react';

const PasswordField = ({ name, value, onChange, placeholder, required = false }) => {
     const [showPassword, setShowPassword] = useState(false);

     return (
          <div className="form-field password-field">
               <label htmlFor={name}>Password</label>
               <div className="password-wrapper">
                    <input
                         type={showPassword ? "text" : "password"}
                         id={name}
                         name={name}
                         placeholder={placeholder}
                         value={value}
                         onChange={onChange}
                         required={required}
                    />
                    <span
                         className="toggle-eye"
                         onClick={() => setShowPassword(!showPassword)}
                    >
                         {showPassword ? "🙈" : "👁️"}
                    </span>
               </div>
          </div>
     );
};

export default PasswordField;