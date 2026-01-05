
import { useEmployees } from "../../context/useEmployees"; 
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";






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
        <td className="text-center">
            <div className="flex justify-center items-center">
                <FaCircleUser className="text-lg" />
            </div>
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
      
      <td className="px-3 py-2">
  <div className="flex items-center justify-center gap-4">
    
    <div className="relative group">
      <button
        aria-label="Edit employee"
        className="text-blue-600 hover:text-blue-800 transition"
      >
        <FaEdit className="text-lg" />
      </button>

      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100 transition
        bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Edit
      </span>
    </div>

    
    <div className="relative group">
      <button
        aria-label="Delete employee"
        className="text-red-600 hover:text-red-800 transition"
      >
        <MdDeleteOutline className="text-xl" />
      </button>

      <span className="absolute -top-8 left-1/2 -translate-x-1/2
        scale-0 group-hover:scale-100 transition
        bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Delete
      </span>
    </div>

    
    <div className="relative group">
      <button
        onClick={() => window.print()}
        aria-label="Print employee"
        className="text-gray-600 hover:text-gray-800 transition"
      >
        <FaPrint className="text-lg" />
      </button>

      <span className="absolute -top-8 left-1/2 -translate-x-1/2
        scale-0 group-hover:scale-100 transition
        bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Print
      </span>
    </div>
  </div>
</td>

    </tr>
  );
};

export default EmployeeRow;
