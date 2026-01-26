import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import  AuthContext from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const adminhandlesubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await API.post("/admin/adminlogin", form);
        login(res.data.token, res.data.role);
        navigate("/admin");
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "Login failed. your are not admin."
        );
        
      }
    };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow mt-5">
            <div className="card-body">
              <h3 className="text-center mb-3">Admin Login</h3>

              <form onSubmit={adminhandlesubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
