export default function Contact() {
  return (
        <div className="container mt-5">
        <h2 className="text-center mb-2 fw-bold">Get in Touch</h2>
        <p className="text-center text-muted mb-4">
            We’d love to hear from you. Our support team is here to help.
        </p>

        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
            <div
                className="card shadow-lg border-0"
                style={{
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                color: "white",
                }}
            >
                <div className="card-body p-4">
                <div className="mb-3 d-flex align-items-center">
                    <span className="fs-4 me-3">✉️</span>
                    <div>
                    <h6 className="mb-0">Email</h6>
                    <p className="mb-0">support@servicebooking.com</p>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <span className="fs-4 me-3">📞</span>
                    <div>
                    <h6 className="mb-0">Phone</h6>
                    <p className="mb-0">+91 90000 00000</p>
                    </div>
                </div>

                <div className="mb-4 d-flex align-items-center">
                    <span className="fs-4 me-3">📍</span>
                    <div>
                    <h6 className="mb-0">Address</h6>
                    <p className="mb-0">Chennai, Tamil Nadu, India</p>
                    </div>
                </div>

                <hr className="border-light" />

                <p className="text-light mt-3 mb-0">
                    For service-related queries, bookings, or feedback, feel free to
                    reach out. Our team usually responds within{" "}
                    <strong>24 hours</strong>.
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>

  );
}
