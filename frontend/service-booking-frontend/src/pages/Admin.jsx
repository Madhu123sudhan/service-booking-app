import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const markCompleted = async (id) => {
    try {
      await API.put(`/admin/bookings/${id}`);
      toast.success("Status updated to Completed");
      loadBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update booking"
      );
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
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No bookings found
                  </td>
                </tr>
              )}

              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.user?.name || "N/A"}</td>
                  <td>{b.user?.email || "N/A"}</td>
                  <td>{b.service?.name}</td>
                  <td>₹{b.service?.price}</td>
                  <td>
                    {new Date(b.dateTime).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(b.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }).toUpperCase()}
                  </td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (b.status === "Completed"
                                ? "bg-success": 
                        b.status === "Cancelled"
                                ? "bg-danger"
                                :"bg-warning")

                      }
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === "Pending" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => markCompleted(b._id)}
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}
