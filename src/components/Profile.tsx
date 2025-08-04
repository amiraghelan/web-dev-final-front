import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import "@styles/components/Profile.scss";

const Profile = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { user } = authContext;

  return (
    <div className="profile">
      <div className="profile-content">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
          <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
          <p><strong>Role:</strong> {user.role || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;