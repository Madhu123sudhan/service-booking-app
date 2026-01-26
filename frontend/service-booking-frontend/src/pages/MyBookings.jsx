import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await API.put(`/bookings/cancel/${id}`);
      toast.success("Booking cancelled");
      loadBookings();
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading bookings...</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Bookings</h2>

        <div className="row">
          {bookings.length === 0 && (
            <p className="text-center text-muted">No bookings found</p>
          )}

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
                    {new Date(b.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }).toUpperCase()}
                </p>


                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span
                        className={
                        "badge " +
                        (b.status === "Completed"
                            ? "bg-success"
                            : b.status === "Cancelled"
                            ? "bg-danger"
                            : "bg-warning")
                        }
                    >
                        {b.status}
                    </span>

                    {b.status === "Pending" && (
                        <button
                        className="btn btn-sm btn-danger text-white px-3"
                        onClick={() => cancelBooking(b._id)}
                        >
                        Cancel
                        </button>
                    )}
                    </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
