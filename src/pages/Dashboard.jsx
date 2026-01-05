import { useMemo, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeSummary from "../components/employees/EmployeeSummary";
import EmployeeModal from "../components/employees/EmployeeModal";
import { useEmployees } from "../context/useEmployees";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { employees, loading } = useEmployees();
  const { logout } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesName = emp.employee_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGender =
        gender === "All" || emp.gender === gender;

      const matchesStatus =
        status === "All" ||
        (status === "Active" && emp.isActive) ||
        (status === "Inactive" && !emp.isActive);

      return matchesName && matchesGender && matchesStatus;
    });
  }, [employees, search, gender, status]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setMode("create");
              setSelectedEmployee(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <EmployeeSummary />

      <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading employees...
        </div>
      )}

      {!loading && filteredEmployees.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No employees found matching your filters.
        </div>
      )}

      {!loading && filteredEmployees.length > 0 && (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={(emp) => {
            setMode("edit");
            setSelectedEmployee(emp);
            setModalOpen(true);
          }}
        />
      )}

      <EmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={mode}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default Dashboard;
