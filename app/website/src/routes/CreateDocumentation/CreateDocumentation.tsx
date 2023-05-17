import Button from "../../components/Buttons/Button";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateDocumentation = () => {
  const [value, setValue] = useState("");
  const handleCreateDocumentation = () => {
    console.log(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
  ];
  return (
    <div>
      <h1 className="text-center">Create Documentation</h1>

      <div className="p-4">
        {/* Input with label */}
        <div className="flex justify-center flex-col">
          <div className="pt-2 pb-2">Title</div>
          <input
            className="p-2 border rounded"
            type="text"
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="flex justify-center flex-col">
          <div className="pt-2 pb-2">Content</div>
          <div className="pb-5">
            <ReactQuill
              className="h-96"
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="flex justify-center p-12">
          <Button
            text="Create"
            theme="primary"
            onClick={handleCreateDocumentation}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentation;
