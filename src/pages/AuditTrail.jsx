import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function AuditTrail() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    api.get("/documents", { withCredentials: true })
      .then(res => setDocs(res.data))
      .catch(err => console.error("Failed to fetch audit trail:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Audit Trail
        </h1>

        <div className="overflow-x-auto shadow rounded-2xl">
          <table className="w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">File Name</th>
                <th className="px-4 py-2 text-left">Hash</th>
                <th className="px-4 py-2 text-left">Signed At</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{doc.fileName}</td>
                  <td className="px-4 py-2 text-xs break-all">{doc.hash}</td>
                  <td className="px-4 py-2">
                    {new Date(doc.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No signed documents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
