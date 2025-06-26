import FormField from '../common/FormField';
import PasswordField from '../common/PasswordField';
import { DEPARTMENTS, SEMESTERS, ROLES } from '../../constants/formOptions';

const SignupForm = ({ formData, handleInputChange, onSubmit, loading }) => {
     return (
          <form onSubmit={onSubmit}>
               <FormField
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
               />

               <FormField
                    label="Department"
                    type="select"
                    name="dept"
                    value={formData.dept}
                    onChange={handleInputChange}
                    options={DEPARTMENTS}
                    required
               />

               <FormField
                    label="Year"
                    type="select"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    options={SEMESTERS}
                    required
               />

               <FormField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
               />

               <FormField
                    label="Role"
                    type="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    options={ROLES}
                    required
               />

               <FormField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your college email(@sjcetpalai.ac.in)"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@sjcetpalai\.ac\.in$"
                    title="Email must be a valid @sjcetpalai.ac.in address"
               />

               <PasswordField
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
               />

               <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : 'Sign Up'}
               </button>
          </form>
     );
};

export default SignupForm;