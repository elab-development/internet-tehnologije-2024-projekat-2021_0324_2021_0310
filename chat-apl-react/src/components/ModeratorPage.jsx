import React, { useState } from "react";
import "./ModeratorPage.css";

const ModeratorPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  const fetchReports = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/moderator/reported-messages", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju prijava:", err);
        setLoading(false);
      });
  };

  

  const handleSuspend = (userId) => {
    if (!window.confirm("Da li ste sigurni da želite da suspendujete ovog korisnika?")) return;

    fetch(`http://localhost:8000/api/moderator/suspend-user/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        fetchReports();
      })
      .catch(async (err) => {
        const errorData = await err.json();
        alert(errorData.message || "Došlo je do greške pri suspendovanju.");
      });
  };

  const handleResolve = (reportId) => {
    if (!window.confirm("Označiti ovu prijavu kao rešenu bez suspenzije?")) return;

    fetch(`http://localhost:8000/api/moderator/resolve-report/${reportId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchReports();
      })
      .catch((err) => {
        console.error("Greška pri označavanju kao rešeno:", err);
      });
  };

  const isSuspended = (user) => {
    if (!user?.suspended_until) return false;
    return new Date(user.suspended_until) > new Date();
  };

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredReports = reports.filter((report) => {
    if (filter === "resolved") return report.resolved;
    if (filter === "unresolved") return !report.resolved;
    return true;
  });

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className="moderator-container">
      <h2>Prijavljene poruke</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Sve</option>
          <option value="unresolved">Neresene</option>
          <option value="resolved">Resene</option>
        </select>
      </div>

      {filteredReports.length === 0 ? (
        <p>Nema prijavljenih poruka.</p>
      ) : (
        <table className="moderator-table">
          <thead>
            <tr>
              <th>Poruka</th>
              <th>Autor poruke</th>
              <th>Prijavio</th>
              <th>Razlog</th>
              <th>Datum prijave</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => {
              const user = report.message?.user;
              const createdAt = new Date(report.message?.created_at);
              const suspendedUntil = user?.suspended_until ? new Date(user.suspended_until) : null;

              const aktivnaSuspenzija = user && isSuspended(user);
              const jeUzrokSuspenzije = aktivnaSuspenzija && createdAt < suspendedUntil;

              const prikazAkcije = () => {
                if (!user) return <span>N/A</span>;

                if (report.resolved_by_suspension) {
                  return (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Suspendovan do: {formatDateTime(user.suspended_until)}
                    </span>
                  );
                }

                if (report.resolved && !report.resolved_by_suspension) {
                  return <span style={{ color: "gray" }}>Rešeno bez suspenzije</span>;
                }

                if (aktivnaSuspenzija && !jeUzrokSuspenzije) {
                  return <span style={{ color: "gray" }}>Završeno</span>;
                }

                return (
                  <>
                    <button
                      className="suspend-btn"
                      onClick={() => handleSuspend(user.id)}
                      style={{ marginRight: "6px" }}
                    >
                      Suspenduj
                    </button>
                    <button
                      className="resolve-btn"
                      onClick={() => handleResolve(report.id)}
                    >
                      Reši bez suspenzije
                    </button>
                  </>
                );
              };

              return (
                <tr key={report.id}>
                  <td>{report.message?.content}</td>
                  <td>{user?.email}</td>
                  <td>{report.reporter?.email}</td>
                  <td>{report.reason}</td>
                  <td>{new Date(report.created_at).toLocaleString()}</td>
                  <td>{prikazAkcije()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModeratorPage;