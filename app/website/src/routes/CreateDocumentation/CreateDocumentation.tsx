import Button from "../../components/Buttons/Button";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchService } from "../../utils/AxiosInterceptor";
import { getUserData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const CreateDocumentation = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleCreateDocumentation = () => {
    const getIdFromUrl = window.location.pathname.split("/")[2];
    const data = {
      title: title,
      content: value,
      projectId: getIdFromUrl,
      authorId: getUserData()?.id,
    };
    console.log(data);

    fetchService.post("/documentation/create", data).then((res) => {
      console.log(res);
    });

    navigate(`${ROUTES.VIEW_PROJECT}/${getIdFromUrl}`);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
