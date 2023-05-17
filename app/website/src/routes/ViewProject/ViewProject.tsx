import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";
import { ROUTES } from "../../constants/routes";
import { Project } from "../../types/Project.types";
import { ProjectResponse } from "../../types/response.types";
import { fetchService } from "../../utils/AxiosInterceptor";

const ViewProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const { data }: ProjectResponse = await fetchService.get(
          `/project/${id}`
        );
        setProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleCreateDocumentation = () => {
    navigate(ROUTES.CREATE_DOCUMENTATION);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {project && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-xl">{project.description}</p>
        </div>
      )}
      <div className="py-3">
        <Button
          text="Create Documentation"
          theme="primary"
          onClick={handleCreateDocumentation}
        />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Documentation
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Documentation 1
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Type 1
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
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

export default ViewProject;
