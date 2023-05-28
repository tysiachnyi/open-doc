import { useEffect, useState } from "react";
import { fetchService } from "../../utils/AxiosInterceptor";
import Loading from "../../components/Loading/Loading";

type Profile = {
  _id: string;
  name: string;
  email: string;
};

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    fetchService
      .get("/profile", {
        params: {
          id: JSON.parse(window.localStorage.getItem("user") || "{}").id,
        },
      })
      .then((res) => {
        setLoading(false);
        setProfile(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        Name: {profile.name}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        Email: {profile.email}
      </div>
    </div>
  );
};

export default Profile;
