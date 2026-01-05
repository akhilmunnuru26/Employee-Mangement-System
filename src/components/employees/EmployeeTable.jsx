import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, onEdit }) => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <EmployeeRow key={emp.id} emp={emp} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
