import React, { useEffect, useState } from "react";

export default function ModeratorPage() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "moderator") {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);

  if (!hasAccess) {
    return (
      <div>
        <h1>Moderator Panel</h1>
        <p style={{ color: "red" }}>Nemate pristup ovoj stranici.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Moderator Panel</h1>
      <p>Dobrodošli u moderaciju. Ovde možete upravljati prijavljenim porukama.</p>
      {/* Ovde ide moderatorski UI – npr. lista prijava, banovanje itd. */}
    </div>
  );
}
