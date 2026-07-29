import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-section not-found">
      <h2>404</h2>
      <p>That page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
