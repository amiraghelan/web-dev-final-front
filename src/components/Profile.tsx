import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import config from "@data/configs.json";
import "@styles/components/Profile.scss";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { user, token, updateUser } = authContext;

  const openModal = () => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFirstName("");
    setLastName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${config.apiBaseUrl}/user/profile`,
        { firstName: firstName || null, lastName: lastName || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser(response.data.user);
      toast.success("Profile updated successfully");
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
          <button className="edit-button" onClick={openModal}>
            Edit Profile
          </button>
        </div>
        <div className="profile-card">
          <div className="profile-avatar">
            <span role="img" aria-label="User Avatar">👤</span>
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <span className="field-label">Username</span>
              <span className="field-value">{user.username || "N/A"}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">First Name</span>
              <span className="field-value">{user.firstName || "N/A"}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Last Name</span>
              <span className="field-value">{user.lastName || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name (optional)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name (optional)"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;