import { createContext, useEffect, useState } from "react";
import { fetchEmployees } from "../api/employeeApi";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(
        res.data.data.map((e) => ({
          ...e,
          isActive: true,
          gender: "Male",
          dob: "1990-01-01",
          state: "Telangana",
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
};
