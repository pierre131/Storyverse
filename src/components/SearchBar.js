import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="🔎 ابحث عن قصة بالعنوان..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
}

export default SearchBar;