import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { DocumentsProvider } from "./context/DocumentsContext.jsx";
import Chat from "./pages/Chat.jsx";
import Documents from "./pages/Documents.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Upload from "./pages/Upload.jsx";

export default function App() {
  return (
    <DocumentsProvider>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </DocumentsProvider>
  );
}
