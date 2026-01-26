export default function Contact() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <p><strong>Email:</strong> support@servicebooking.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> Chennai, Tamil Nadu, India</p>

              <hr />

              <p className="text-muted">
                For service-related queries, bookings, or feedback, feel free to
                reach out. We respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
