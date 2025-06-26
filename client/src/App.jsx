import { useState } from 'react'
import './App.css'

import Login from './Login/Login'
import Landing from './landing/Landing'

function App() {
     const [user, setUser] = useState(null)
     const [isLogin, setIsLogin] = useState(true)
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState('')
     const [showPassword, setShowPassword] = useState(false)

     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          dept: '',
          year: '',
          phone: '',
          role: 'student'
     })

     const API_BASE = 'http://localhost:3000'

     const handleInputChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          })
     }

     const handleAuth = async (e) => {
          e.preventDefault()
          setLoading(true)
          setError('')

          try {
               const endpoint = isLogin ? '/auth/login' : '/auth/signup'
               const payload = isLogin
                    ? { email: formData.email, password: formData.password }
                    : formData

               const response = await fetch(`${API_BASE}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
               })

               const data = await response.json()

               if (response.ok) {
                    if (isLogin) {
                         setUser(data.user)
                    } else {
                         setIsLogin(true)
                         alert('Signup successful! Please login.')
                    }
               } else {
                    setError(data.error || 'Something went wrong')
               }
          } catch (err) {
               setError('Network error. Check your connection.')
          } finally {
               setLoading(false)
          }
     }

     const handleLogout = () => {
          setUser(null)
          setFormData({
               name: '', email: '', password: '', dept: '', year: '', phone: '', role: 'student'
          })
     }

     if (user) {
          return (
               <div className="dashboard">
                    <header>
                         <h1>ShortX</h1>
                         <div>
                              <span>Welcome, {user.name}!</span>
                              <button onClick={handleLogout}>Logout</button>
                         </div>
                    </header>

                    <main>
                         <div className="url-section">
                              <h2>Shorten Your URL</h2>
                              <div className="url-form">
                                   <input type="url" placeholder="Enter your long URL here" />
                                   <button>Shorten URL</button>
                              </div>
                         </div>

                         <div className="stats">
                              <p>Total URLs: {user.url_count || 0}</p>
                              <p>Department: {user.dept}</p>
                              <p>Year: {user.year}</p>
                         </div>
                    </main>
               </div>
          )
     }

     return (
          <div className="auth-container">
               <div className="auth-box">
                    <h1>ShortX</h1>
                    <p>Official Link-Shortening tool for SJCET</p>

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

                    {error && <div className="error">{error}</div>}

                    <form onSubmit={handleAuth}>
                         {!isLogin && (
                              <>
                                   <div className="form-field">
                                        <label htmlFor="name">Name</label>
                                        <input
                                             type="text"
                                             id="name"
                                             name="name"
                                             placeholder="Enter your name"
                                             value={formData.name}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>

                                   <div className="form-field">
                                        <label htmlFor="dept">Department</label>
                                        <select
                                             id="dept"
                                             name="dept"
                                             value={formData.dept}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="">Select your department</option>
                                             <option value="CSE">Computer Science</option>
                                             <option value="CSAI">CS(AI)</option>
                                             <option value="CY">Cyber</option>
                                             <option value="AI-DS">AI and Data Science</option>
                                             <option value="ECS">Electronics and Computer</option>
                                             <option value="ECE">Electronics and Communication</option>
                                             <option value="EEE">Electrical and Electronics</option>
                                             <option value="MECH">Mechanical</option>
                                             <option value="CIVIL">Civil</option>
                                        </select>
                                   </div>

                                   <div className="form-field">
                                        <label htmlFor="year">Year</label>
                                        <select
                                             id="year"
                                             name="year"
                                             value={formData.year}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="">Select your semester</option>
                                             <option value="1">First Sem</option>
                                             <option value="2">Second Sem</option>
                                             <option value="3">Third Sem</option>
                                             <option value="4">Fourth Sem</option>
                                             <option value="5">Fifth Sem</option>
                                             <option value="6">Sixth Sem</option>
                                             <option value="7">Seventh Sem</option>
                                             <option value="8">Eighth Sem</option>
                                        </select>
                                   </div>

                                   <div className="form-field">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                             type="tel"
                                             id="phone"
                                             name="phone"
                                             placeholder="Enter your phone number"
                                             value={formData.phone}
                                             onChange={handleInputChange}
                                             required
                                             pattern="[0-9]{10}"
                                             maxLength="10"
                                        />
                                   </div>

                                   <div className="form-field">
                                        <label htmlFor="role">Role</label>
                                        <select
                                             id="role"
                                             name="role"
                                             value={formData.role}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="student">Student</option>
                                             <option value="faculty">Faculty</option>
                                        </select>
                                   </div>
                              </>
                         )}

                         {isLogin && (
                              <div className="form-field">
                                   <label htmlFor="login-name">Name</label>
                                   <input
                                        type="text"
                                        id="login-name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                   />
                              </div>
                         )}

                         <div className="form-field">
                              <label htmlFor="email">Email</label>
                              <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="Enter your college email(@sjcetpalai.ac.in)"
                                   value={formData.email}
                                   onChange={handleInputChange}
                                   required
                                   pattern="^[a-zA-Z0-9._%+-]+@sjcetpalai\.ac\.in$"
                                   title="Email must be a valid @sjcetpalai.ac.in address"
                              />
                         </div>

                         <div className="form-field password-field">
                              <label htmlFor="password">Password</label>
                              <div className="password-wrapper">
                                   <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                   />
                                   <span
                                        className="toggle-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                   >
                                        {showPassword ? "🙈" : "👁️"}
                                   </span>
                              </div>
                         </div>

                         <button type="submit" disabled={loading}>
                              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                         </button>
                    </form>
               </div>
          </div>
     )
}

export default App
