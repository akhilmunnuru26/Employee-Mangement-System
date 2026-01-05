import { useState } from "react";
import EmployeeSummary from "../components/employees/EmployeeSummary";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useEmployees } from "../context/useEmployees";
import { useAuth } from "../context/useAuth";

const PAGE_SIZE = 5;

const Dashboard = () => {
  const { logout } = useAuth();
  const { employees, setEmployees, loading } = useEmployees();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔍 Search
  const filteredEmployees = employees.filter((emp) =>
    emp.employee_name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Employee Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Summary */}
      <EmployeeSummary />

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-3 py-2 border rounded"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <EmployeeTable employees={paginatedEmployees} />
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
