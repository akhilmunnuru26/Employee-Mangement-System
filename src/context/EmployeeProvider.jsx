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

  // CREATE
  const addEmployee = (data) => {
    setEmployees((prev) => [
      { ...data, id: Date.now(), isActive: true },
      ...prev,
    ]);
  };

  // UPDATE
  const updateEmployeeById = (id, updates) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      )
    );
  };

  // DELETE
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
        setEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;


// Below Code is With the Employees Data with local storage Persistence


// import { useEffect, useState } from "react";
// import { EmployeeContext } from "./EmployeeContext";
// import { fetchEmployees } from "../api/employeeApi";

// const STORAGE_KEY = "employees";

// const EmployeeProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const loadEmployees = async () => {
//     try {
//       const cached = localStorage.getItem(STORAGE_KEY);
//       if (cached) {
//         setEmployees(JSON.parse(cached));
//         setLoading(false);
//         return;
//       }

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
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
//     } catch (err) {
//       console.error("Failed to load employees", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
//     }
//   }, [employees, loading]);

//   const addEmployee = (data) => {
//     setEmployees((prev) => [
//       { ...data, id: Date.now(), isActive: true },
//       ...prev,
//     ]);
//   };

//   const updateEmployeeById = (id, updates) => {
//     setEmployees((prev) =>
//       prev.map((emp) =>
//         emp.id === id ? { ...emp, ...updates } : emp
//       )
//     );
//   };

//   const deleteEmployeeById = (id) => {
//     setEmployees((prev) =>
//       prev.filter((emp) => emp.id !== id)
//     );
//   };

//   return (
//     <EmployeeContext.Provider
//       value={{
//         employees,
//         loading,
//         addEmployee,
//         updateEmployeeById,
//         deleteEmployeeById,
//       }}
//     >
//       {children}
//     </EmployeeContext.Provider>
//   );
// };

// export default EmployeeProvider;
