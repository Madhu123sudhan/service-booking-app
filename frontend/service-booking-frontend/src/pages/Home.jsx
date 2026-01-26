import { Link } from "react-router-dom";


export default function Home() {
const services = [
{
name: "Hair Cut",
desc: "Professional styling and grooming tailored to your look and comfort.",
icon: "✂️",
},
{
name: "Facial",
desc: "Deep cleansing and glow-enhancing facial treatment for fresh skin.",
icon: "💆",
},
{
name: "Pedicure",
desc: "Foot care and relaxation treatment for comfort and hygiene.",
icon: "🦶",
},
{
name: "Spa",
desc: "Full body relaxation therapy for stress relief and wellness.",
icon: "🧖",
},
];


return (
<div className="container mt-5">
<div className="text-center mb-5">
<h1>Welcome to Service Booking</h1>
<p className="text-muted">
Book professional services easily, quickly, and securely from anywhere.
</p>
<Link to="/services" className="btn btn-primary mt-3">
Explore Services
</Link>
</div>


<div className="row">
{services.map((s, i) => (
<div key={i} className="col-12 col-md-6 col-lg-3 mb-4">
<div className="card shadow text-center h-100">
<div className="card-body">
<div style={{ fontSize: "40px" }}>{s.icon}</div>
<h5 className="mt-3">{s.name}</h5>
<p className="text-muted">{s.desc}</p>
</div>
</div>
</div>
))}
</div>
</div>
);
}