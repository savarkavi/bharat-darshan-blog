import { useGetMyBlogs } from "../api/blog/blogApi";
import { useUser } from "../hooks/useUser";

const Profile = () => {
  const user = useUser();

  const { data, isLoading } = useGetMyBlogs(user.userId);

  return <div className="flex-1">Profile</div>;
};

export default Profile;
