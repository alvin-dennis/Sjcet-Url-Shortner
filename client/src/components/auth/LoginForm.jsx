import FormField from '../common/FormField';
import PasswordField from '../common/PasswordField';

const LoginForm = ({ formData, handleInputChange, onSubmit, loading }) => {
     return (
          <form onSubmit={onSubmit}>
               <FormField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your college email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
               />

               <PasswordField
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
               />

               <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : 'Login'}
               </button>
          </form>
     );
};

export default LoginForm;