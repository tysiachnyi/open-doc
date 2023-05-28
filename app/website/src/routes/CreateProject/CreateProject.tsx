import { useState } from "react";
import Button from "../../components/Buttons/Button";
import { fetchService } from "../../utils/AxiosInterceptor";

const CreateProject = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "front_end",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });

  const handleCreateProject = () => {
    setErrors({ title: false, description: false });

    if (!formData.title && !formData.description) {
      setErrors({ title: true, description: true });
      return;
    }

    if (!formData.title) {
      setErrors({ ...errors, title: true });
    }
    if (!formData.description) {
      setErrors({ ...errors, description: true });
    }

    if (formData.title && formData.description) {
      fetchService
        .post("/project/create", {
          title: formData.title,
          description: formData.description,
          type: formData.type,
          authorId: JSON.parse(window.localStorage.getItem("user") || "{}").id,
        })
        .then((res) => {
          console.log(res);
          setSuccess(true);
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[500px] p-6 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Project</h1>

        {/* Success message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <span className="block">Project created successfully</span>
          </div>
        )}

        {/* Input fields */}
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="text-lg">
              Title
            </label>
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
            <input
              maxLength={30}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              id="title"
              placeholder="Title"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-lg">
              Description
            </label>
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              maxLength={50}
              id="description"
              placeholder="Description"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="type" className="text-lg">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
              id="type"
            >
              <option value="front_end">Front End</option>
              <option value="back_end">Back End</option>
            </select>
          </div>

          {/* Create button */}
          <div className="flex justify-center">
            <Button
              text="Create"
              theme="primary"
              onClick={handleCreateProject}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateProject;
