import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { typeNames } from "../../constants/project";
import { ROUTES } from "../../constants/routes";
import { fetchService } from "../../utils/AxiosInterceptor";

type Projects = {
  _id: string;
  title: string;
  description: string;
  type: "front_end" | "back_end";
  authorId: string;
};

const ListProjects = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchService
      .get(`/project`, {
        params: {
          authorId: JSON.parse(window.localStorage.getItem("user") || "{}").id,
        },
      })
      .then((res) => {
        setProjects(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const listOfProjects = () => {
    if (projects) {
      return projects.map((project) => (
        <tr
          className="cursor-pointer"
          key={project._id}
          onClick={() => {
            navigate(`${ROUTES.VIEW_PROJECT}/${project._id}`);
          }}
        >
          <td id="title" className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {project.title}
                </div>
              </div>
            </div>
          </td>
          <td id="type" className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {typeNames[project.type]}
                </div>
              </div>
            </div>
          </td>
          <td id="type" className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {project.description}
                </div>
              </div>
            </div>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td id="title" className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  No projects
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center">Projects</h1>
      <div className="p-4">
        {/* tailiwindcss list of projects */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listOfProjects()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProjects;
