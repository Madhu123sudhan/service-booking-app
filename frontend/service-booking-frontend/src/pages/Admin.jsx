import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Admin() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    API.get("/api/admin/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const markCompleted = async (id) => {
    try {
      await API.put(`/api/admin/bookings/${id}`);
      toast.success("Marked as Completed");
      loadBookings();
    } catch {
      toast.error("Update failed");
    }
  };

  const data = [
    {
      name: "Completed",
      value: bookings.filter((b) => b.status === "Completed").length,
    },
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
    },
  ];

  const COLORS = ["#198754", "#ffc107"];

  return (
    <PageWrapper>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="row mb-4 justify-content-center">
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="row">
          {bookings.map((b) => (
            <div key={b._id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{b.service.name}</h5>
                  <p>₹{b.service.price}</p>
                  <p>{new Date(b.dateTime).toLocaleString()}</p>

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

                  {b.status === "Pending" && (
                    <button
                      className="btn btn-success w-100 mt-2"
                      onClick={() => markCompleted(b._id)}
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
