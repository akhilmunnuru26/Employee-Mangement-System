import { useState } from "react";
import Modal from "../common/Modal";
import { useEmployees } from "../../context/useEmployees";

const initialState = {
  employee_name: "",
  gender: "Male",
  dob: "",
  state: "",
};

const EmployeeModal = ({ open, onClose, mode, employee }) => {
  const { addEmployee, updateEmployeeById } = useEmployees();

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

 
  const handleOpen = () => {
    setError("");

    if (mode === "edit" && employee) {
      setForm({
        employee_name: employee.employee_name || "",
        gender: employee.gender || "Male",
        dob: employee.dob || "",
        state: employee.state || "",
      });
    } else {
      setForm(initialState);
    }
  };

  const handleSubmit = () => {
    if (!form.employee_name || !form.state || !form.dob) {
      setError("All fields are required");
      return;
    }

    if (mode === "create") {
      addEmployee(form);
    } else {
      updateEmployeeById(employee.id, form);
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onOpen={handleOpen}  
      title={mode === "create" ? "Add Employee" : "Edit Employee"}
    >
      <div className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Employee Name"
          value={form.employee_name}
          onChange={(e) =>
            setForm({ ...form, employee_name: e.target.value })
          }
        />

        <select
          className="w-full border px-3 py-2 rounded"
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={form.dob}
          max={new Date().toISOString().split('T')[0]} 
          onChange={(e) =>
            setForm({ ...form, dob: e.target.value })
          }
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {mode === "create" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeModal;
