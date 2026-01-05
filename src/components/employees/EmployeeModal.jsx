import { useState } from "react";
import Modal from "../common/Modal";
import { useEmployees } from "../../context/useEmployees";

const STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
];

const initialState = {
  employee_name: "",
  gender: "Male",
  dob: "",
  state: "",
  isActive: true,
  avatar: "",
};

const EmployeeModal = ({ open, onClose, mode, employee }) => {
  const { addEmployee, updateEmployeeById } = useEmployees();

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleOpen = () => {
    setError("");

    if (mode === "edit" && employee) {
      setForm({
        employee_name: employee.employee_name,
        gender: employee.gender,
        dob: employee.dob,
        state: employee.state,
        isActive: employee.isActive,
        avatar: employee.avatar || "",
      });
    } else {
      setForm(initialState);
    }
  };

  const validate = () => {
    if (!form.employee_name.trim()) return "Name is required";
    if (!form.dob) return "Date of Birth is required";
    if (!form.state) return "State is required";
    if (!form.avatar) return "Profile image is required";
    return "";
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    if (mode === "create") {
      addEmployee(form);
    } else {
      updateEmployeeById(employee.id, form);
    }
    setError('')
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onOpen={handleOpen}
      title={mode === "create" ? "Add Employee" : "Edit Employee"}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 border rounded-full overflow-hidden flex items-center justify-center">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">No Image</span>
            )}
          </div>

          <label className="cursor-pointer text-blue-600 text-sm">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>


        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Full Name"
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
          max={new Date().toISOString().split("T")[0]}
          value={form.dob}
          onChange={(e) =>
            setForm({ ...form, dob: e.target.value })
          }
        />

        <select
          className="w-full border px-3 py-2 rounded"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
        >
          <option value="">Select State</option>
          {STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({ ...form, isActive: e.target.checked })
            }
          />
          Active
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
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
