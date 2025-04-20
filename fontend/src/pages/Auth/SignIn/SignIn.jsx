import React, {useState} from "react";
import "./SignIn.css"
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
 
// import { Button } from "bootstrap";
const Login = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [email, setEmail] = useState("")
  const [agentEmail, setAgentEmail] = useState("")

  const Connect = async () => {
    try {
      if (email && agentEmail) {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('agentEmail', agentEmail);
        navigate("/chatbot")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    if (decoded) {
      setEmail(decoded.email)
    }
    console.log("User Info:", decoded.email); // email, name, picture
  };

  return (
    
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                      <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Agent Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          onChange={(e) => setAgentEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-lg btn-primary" onClick={Connect}>
                          Connect
                        </button>
                        {/* <Link to="/admin/dashboard">Sign In</Link> */}
                      </div>
                  </div>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
