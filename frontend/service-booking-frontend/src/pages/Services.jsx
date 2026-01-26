import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";

export default function Services() {
  const [services, setServices] = useState([]);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"));
  }, []);

  const bookService = async (serviceId) => {
    if (!dateTime) {
      toast.warning("Please select date and time");
      return;
    }

    try {
      await API.post("/bookings", {
        serviceId,
        dateTime,
      });
      toast.success("Service booked successfully!");
    } catch {
      toast.error("Booking failed");
    }
  };

  return (
    <PageWrapper>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Available Services</h2>

        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <input
              type="datetime-local"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {services.map((service) => (
            <div
              key={service._id}
              className="col-12 col-sm-6 col-lg-3 mb-3"
            >
              <div className="card shadow h-100">
                <div className="card-body d-flex flex-column">
                  <h5>{service.name}</h5>
                  <p>₹{service.price}</p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => bookService(service._id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
