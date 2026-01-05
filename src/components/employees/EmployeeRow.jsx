
import { useEmployees } from "../../context/useEmployees"; 


const EmployeeRow = ({ emp }) => {
 const { employees, setEmployees } = useEmployees();
  const toggleStatus = () => {
    setEmployees(
      employees.map((e) =>
        e.id === emp.id ? { ...e, isActive: !e.isActive } : e
      )
    );
  };

  return (
    <tr className="border-t text-center">
      <td className="p-2">{emp.id}</td>
      <td>
        <img src="/avatar.png" className="w-8 h-8 mx-auto rounded-full" />
      </td>
      <td>{emp.employee_name}</td>
      <td>{emp.gender}</td>
      <td>{emp.dob}</td>
      <td>{emp.state}</td>
      <td>
        <button
          onClick={toggleStatus}
          className={`px-2 py-1 rounded text-white ${
            emp.isActive ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {emp.isActive ? "Active" : "Inactive"}
        </button>
      </td>
      <td className="space-x-2">
        <button className="text-blue-600">Edit</button>
        <button className="text-red-600">Delete</button>
        <button onClick={() => window.print()} className="text-gray-600">
          Print
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
