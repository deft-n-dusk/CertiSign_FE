import { useState, useRef } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function UploadSign() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("⚠️ Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await api.post("/sign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const id = res.data.documentId;
      setDocId(id);
      setDownloadUrl(`https://certisign-be.onrender.com/download/${id}`);
      setMessage("✅ PDF signed successfully!");
    } catch (err) {
      setMessage("❌ Upload failed: " + (err.response?.data || err.message));
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDownloadClick = () => {
    setTimeout(() => {
      setFile(null);
      setDocId("");
      setDownloadUrl("");
      setMessage("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Upload & Sign PDF
          </h2>

          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-blue-600 file:text-white 
                         hover:file:bg-blue-700 
                         border rounded-lg p-2 text-gray-600"
            />
            <button
              className="bg-green-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
            >
              Sign PDF
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : message.startsWith("❌")
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {message}
            </p>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              className="mt-5 block text-center bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
              download
              onClick={handleDownloadClick}
            >
              Download PDF
            </a>
          )}
        </div>
      </div>
    </>
  );
}
