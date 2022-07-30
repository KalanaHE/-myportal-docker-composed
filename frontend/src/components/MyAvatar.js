import useAuth from "../hooks/useAuth";
import createAvatar from "../utils/createAvatar";
import Avatar from "./Avatar";

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.firstName}
      color={user?.photoURL ? "default" : createAvatar(user?.firstName).color}
      {...other}
    >
      {createAvatar(user?.firstName).name}
    </Avatar>
  );
}
