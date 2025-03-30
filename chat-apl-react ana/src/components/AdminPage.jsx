import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

export default function AdminPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setHasAccess(true);
      fetchUserCount();
      fetchAllUsers();
      fetchMessageCount();
      fetchReportCount();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/users/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCount(res.data.count);
    } catch (error) {
      console.error("❌ Greška prilikom dohvatanja broja korisnika:", error);
    }
  };

  const fetchMessageCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/messages/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessageCount(res.data.count);
    } catch (error) {
      console.error("❌ Greška prilikom dohvatanja broja poruka:", error);
    }
  };

  const fetchReportCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/reports/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReportCount(res.data.count);
    } catch (error) {
      console.error("❌ Greška u dohvatanju broja prijava:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Greška prilikom dohvatanja korisnika:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <p className="loading-text">Učitavanje...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="admin-container">
        <div className="admin-box">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="error-text">Nemate pristup ovoj stranici.</p>
        </div>
      </div>
    );
  }

  const data = [
    ["Tip", "Broj"],
    ["Korisnici", userCount],
  ];

  const options = {
    title: "Ukupan broj korisnika",
    chartArea: { width: "60%" },
    hAxis: {
      title: "Broj",
      minValue: 0,
    },
    vAxis: {
      title: "Tip",
    },
  };

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">
          <strong>Ukupan broj korisnika:</strong> {userCount}
        </p>
        <div className="chart-wrapper">
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
          />
        </div>
      </div>

      <div className="admin-box">
        <h3 className="admin-subtitle">Ukupan broj poruka</h3>
        <p className="stat-value">{messageCount}</p>
      </div>

      <div className="admin-box">
        <h3 className="admin-subtitle">Prijavljene poruke</h3>
        <p className="stat-value">{reportCount}</p>
      </div>

      <div className="admin-box users-box">
        <h2 className="admin-subtitle">Lista korisnika</h2>
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Email</th>
                <th>Uloga</th>
                <th>Kreiran</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name || "-"}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "korisnik"}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
