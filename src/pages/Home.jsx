import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-hero">
      <h1>Ask questions about your own documents</h1>
      <p>
        Upload a PDF, Word document, or text file, and ask questions that get answered strictly
        from what's in it - never from outside knowledge.
      </p>
      <div className="home-actions">
        <Link to="/upload" className="btn btn-primary">
          Upload a document
        </Link>
        <Link to="/chat" className="btn btn-secondary">
          Go to chat
        </Link>
      </div>
    </div>
  );
}
