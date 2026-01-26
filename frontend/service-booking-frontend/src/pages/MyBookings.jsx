import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"));
  }, []);

  if (bookings.length === 0) {
    return (
      <PageWrapper>
        <div className="container mt-5 text-center">
          <h4>No bookings yet</h4>
          <p className="text-muted">Book a service to see it here</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Bookings</h2>

        <div className="row">
          {bookings.map((b) => (
            <div key={b._id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{b.service.name}</h5>
                  <p className="text-muted">₹{b.service.price}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(b.dateTime).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(b.dateTime).toLocaleTimeString()}
                  </p>

                  <span
                    className={
                      "badge " +
                      (b.status === "Completed"
                        ? "bg-success"
                        : "bg-warning")
                    }
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
