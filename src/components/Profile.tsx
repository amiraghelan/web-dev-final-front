import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import config from "@data/configs.json";
import "@styles/components/Profile.scss";

interface Address {
  _id: string;
  title: string;
  country: string;
  city: string;
  address: string;
  zipcode: string;
}

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({ title: "", country: "", city: "", address: "", zipcode: "" });
  const [isLoading, setIsLoading] = useState(false);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { user, token, updateUser } = authContext;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.apiBaseUrl}/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = () => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFirstName("");
    setLastName("");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/user/profile`,
        { firstName: firstName || null, lastName: lastName || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser(response.data.user);
      toast.success("Profile updated successfully");
      closeEditModal();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  const openAddAddressModal = () => {
    setNewAddress({ title: "", country: "", city: "", address: "", zipcode: "" });
    setIsAddAddressModalOpen(true);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressModalOpen(false);
    setNewAddress({ title: "", country: "", city: "", address: "", zipcode: "" });
  };

  const openDetailsModal = (address: Address) => {
    setSelectedAddress(address);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAddress(null);
  };

  const handleAddAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.title || !newAddress.country || !newAddress.city || !newAddress.address || !newAddress.zipcode) {
      toast.error("All address fields are required");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${config.apiBaseUrl}/address`,
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address added successfully");
      await fetchAddresses();
      closeAddAddressModal();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to add address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (_id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${config.apiBaseUrl}/address`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {addressId: _id },
      });
      toast.success("Address deleted successfully");
      await fetchAddresses();
      closeDetailsModal();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
          <button className="edit-button" onClick={openEditModal}>
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
            <div className="profile-field">
              <span className="field-label">Role</span>
              <span className="field-value">{user.role || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="addresses-section">
          <div className="addresses-header">
            <h2 className="addresses-title">Your Addresses</h2>
            <button className="add-address-button" onClick={openAddAddressModal} disabled={isLoading}>
              Add New Address
            </button>
          </div>
          {isLoading ? (
            <div className="loading-spinner">
              <span>Loading...</span>
            </div>
          ) : addresses.length > 0 ? (
            <div className="addresses-list">
              {addresses.map((addr) => (
                <div key={addr._id} className="address-item">
                  <span className="address-title">{addr.title}</span>
                  <button
                    className="details-button"
                    onClick={() => openDetailsModal(addr)}
                    disabled={isLoading}
                  >
                    Show Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-addresses">
              <p>You don’t have any addresses yet. Try adding one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="modal-close" onClick={closeEditModal}>✕</button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
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
                <button type="button" className="cancel-button" onClick={closeEditModal}>
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

      {isAddAddressModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Address</h2>
              <button className="modal-close" onClick={closeAddAddressModal}>✕</button>
            </div>
            <form onSubmit={handleAddAddressSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                  placeholder="Enter address title (e.g., Home, Work)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  placeholder="Enter country"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  value={newAddress.zipcode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
                  placeholder="Enter zipcode"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeAddAddressModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailsModalOpen && selectedAddress && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedAddress.title}</h2>
              <button className="modal-close" onClick={closeDetailsModal}>✕</button>
            </div>
            <div className="address-details">
              <div className="address-field">
                <span className="field-label">Country</span>
                <span className="field-value">{selectedAddress.country}</span>
              </div>
              <div className="address-field">
                <span className="field-label">City</span>
                <span className="field-value">{selectedAddress.city}</span>
              </div>
              <div className="address-field">
                <span className="field-label">Address</span>
                <span className="field-value">{selectedAddress.address}</span>
              </div>
              <div className="address-field">
                <span className="field-label">Zipcode</span>
                <span className="field-value">{selectedAddress.zipcode}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="delete-address-button"
                onClick={() => handleDeleteAddress(selectedAddress._id)}
                disabled={isLoading}
              >
                Delete Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;