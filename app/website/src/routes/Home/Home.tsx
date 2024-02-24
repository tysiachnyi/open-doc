import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { isUserLoggedIn } from "../../utils/helper";
import { ROUTES } from "../../constants/routes";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isUserLoggedIn()) {
      navigate(ROUTES.LIST_PROJECTS);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center p-10">
      <div className="text-gray-800 text-2xl">
        <h1 className="mb-4">
          Welcome to <span className="text-blue-500 font-bold">OPEN DOC</span>
        </h1>
        <p className="mb-6">
          <span className="text-blue-500 font-bold">OPEN DOC</span> is a
          powerful and intuitive documentation creation app. It helps you
          streamline the process of creating, organizing, and sharing
          documentation for your projects or products. Whether you are a
          developer, team lead, or product manager,{" "}
          <span className="text-blue-500 font-bold">OPEN DOC</span> is designed
          to make documentation management efficient and hassle-free.
        </p>
        <p className="mb-6">
          With <span className="text-blue-500 font-bold">OPEN DOC</span>, you
          can easily create rich text documents, add images and code snippets,
          categorize your documentation into folders, collaborate with team
          members, and seamlessly export or share your documentation with
          clients or stakeholders. It's the all-in-one solution for your
          documentation needs.
        </p>
        <Button text="Get Started" theme="primary" onClick={handleGetStarted} />
      </div>
    </div>
  );
};

export default Home;
