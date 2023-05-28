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
    <div className="p-28">
      <h1 className="text-center">Create Project</h1>

      {/* tailwindcss succes message */}
      {success && (
        <div className="flex justify-center">
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Project created successfully
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Input with label */}
        <div className="flex justify-center flex-col">
          <div className="flex justify-between">
            <label htmlFor="title">Title</label>
            {errors.title && (
              <p className="text-center text-red-500">Title is required</p>
            )}
          </div>

          <input
            maxLength={30}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={
              errors.title
                ? "p-2 border border-red-500 rounded"
                : "p-2 border rounded"
            }
            type="text"
            id="title"
            placeholder="Title"
          />

          <div className="flex justify-between">
            <label htmlFor="title">Description</label>
            {errors.description && (
              <p className="text-center text-red-500">
                Description is required
              </p>
            )}
          </div>
          <input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={
              errors.description
                ? "p-2 border border-red-500 rounded"
                : "p-2 border rounded"
            }
            maxLength={50}
            id="description"
            placeholder="Description"
          />

          <label htmlFor="title">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="p-2 border rounded"
            id="title"
            placeholder="Title"
          >
            <option value="front_end">Front End</option>
            <option value="back_end">Back End</option>
          </select>
        </div>
        <div className="flex justify-center p-4">
          <Button text="Create" theme="primary" onClick={handleCreateProject} />
        </div>
      </div>
    </div>
  );
};
export default CreateProject;
