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
    <div>
      <h1>{profile.name}</h1>
      <h1>{profile.email}</h1>
    </div>
  );
};

export default Profile;
