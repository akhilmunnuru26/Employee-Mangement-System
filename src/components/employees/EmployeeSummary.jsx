import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmployeeSummary = () => {
  const { employees } = useContext(EmployeeContext);
  const active = employees.filter((e) => e.isActive).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <p>Total Employees</p>
        <h2 className="text-2xl font-bold">{employees.length}</h2>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <p>Active</p>
        <h2 className="text-2xl font-bold">{active}</h2>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <p>Inactive</p>
        <h2 className="text-2xl font-bold">
          {employees.length - active}
        </h2>
      </div>
    </div>
  );
};

export default EmployeeSummary;
