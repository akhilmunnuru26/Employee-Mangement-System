import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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

      {!loading && (
        <EmployeeTable
          employees={employees}
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
