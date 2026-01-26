import { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };
 return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
        {/* BRAND */}
        <NavLink className="navbar-brand" to="/">
          Service Booking
        </NavLink>

        {/* RIGHT MENU */}
        <div className="d-flex align-items-center gap-3">
          {token && (
            <>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-primary fw-bold" : "text-light")
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-primary fw-bold" : "text-light")
                }
              >
                My Bookings
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-primary fw-bold" : "text-light")
                }
              >
                Contact Us
              </NavLink>
            </>
          )}

          {/* PROFILE */}
          <div className="position-relative">
            <button
              className="btn btn-outline-light rounded-circle"
              onClick={() => setOpen(!open)}
            >
              👤
            </button>

            {open && (
              <div
                className="dropdown-menu dropdown-menu-end show"
                style={{ right: 0, left: "auto" }}
              >
                {!token && (
                  <>
                    <NavLink
                      className="dropdown-item"
                      to="/login"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/register"
                      onClick={() => setOpen(false)}
                    >
                      Register
                    </NavLink>
                  </>
                )}

                {token && (
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
