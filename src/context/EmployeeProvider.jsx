import { useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { fetchEmployees } from "../api/employeeApi"; 

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees();

      const normalized = res.data.map((u) => ({
        id: u.id,
        employee_name: u.name,
        email: u.email,
        state: u.address.city,
        dob: "1992-01-01",              
        gender: u.id % 2 ? "Male" : "Female",
        isActive: true,
        avatar: "/avatar.png",
      }));

      setEmployees(normalized);
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        loading,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
