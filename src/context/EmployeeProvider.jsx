// import { useEffect, useState } from "react";
// import { EmployeeContext } from "./EmployeeContext";
// import { fetchEmployees } from "../api/employeeApi"; 

// const EmployeeProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadEmployees = async () => {
//     try {
//       const res = await fetchEmployees();

//       const normalized = res.data.map((u) => ({
//         id: u.id,
//         employee_name: u.name,
//         email: u.email,
//         state: u.address.city,
//         dob: "1992-01-01",              
//         gender: u.id % 2 ? "Male" : "Female",
//         isActive: true,
//         avatar: "/avatar.png",
//       }));

//       setEmployees(normalized);
//     } catch (err) {
//       console.error("Failed to load employees", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   return (
//     <EmployeeContext.Provider
//       value={{
//         employees,
//         setEmployees,
//         loading,
//       }}
//     >
//       {children}
//     </EmployeeContext.Provider>
//   );
// };

// export default EmployeeProvider;

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

  // ✅ CREATE
  const addEmployee = (data) => {
    setEmployees((prev) => [
      { ...data, id: Date.now(), isActive: true },
      ...prev,
    ]);
  };

  // ✅ UPDATE
  const updateEmployeeById = (id, updates) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      )
    );
  };

  // ✅ DELETE
  const deleteEmployeeById = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
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
        setEmployees, // keep for toggles
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
