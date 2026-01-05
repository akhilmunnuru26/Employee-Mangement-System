
import { useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { fetchEmployees } from "../api/employeeApi";

const STORAGE_KEY = "employees";

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      // 1️⃣ Try localStorage first
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setEmployees(JSON.parse(cached));
        return;
      }

      // 2️⃣ Fallback to API
      const res = await fetchEmployees();

      const normalized = res.data.map((u) => ({
        id: u.id,
        employee_name: u.name,
        email: u.email,
        state: u.address.city,
        dob: "1992-01-01",
        gender: u.id % 2 ? "Male" : "Female",
        isActive: true,
        avatar: "",
      }));

      setEmployees(normalized);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const addEmployee = (data) => {
    setEmployees((prev) => {
      const updated = [
        {
          ...data,
          id: Date.now(),
        },
        ...prev,
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // UPDATE
  const updateEmployeeById = (id, updates) => {
    setEmployees((prev) => {
      const updated = prev.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // DELETE
  const deleteEmployeeById = (id) => {
    setEmployees((prev) => {
      const updated = prev.filter((emp) => emp.id !== id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        addEmployee,
        updateEmployeeById,
        deleteEmployeeById,
        setEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
