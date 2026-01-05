import { useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { fetchEmployees } from "../api/employeeApi"; 

const EmployeeProvider = ({ children }) => {
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
    console.warn("API failed, using fallback data");

    setEmployees([
      {
        id: 1,
        employee_name: "John Doe",
        employee_age: 30,
        employee_salary: 50000,
        isActive: true,
        gender: "Male",
        dob: "1993-02-12",
        state: "Telangana",
      },
      {
        id: 2,
        employee_name: "Jane Smith",
        employee_age: 28,
        employee_salary: 48000,
        isActive: false,
        gender: "Female",
        dob: "1995-06-18",
        state: "Karnataka",
      },
    ]);
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
