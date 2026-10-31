import { useState, useEffect } from "react";

// Profile page - display and edit student information
function Profile() {
  // Default profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Load profile from localStorage when component mounts
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  // Validate email using a basic regular expression
  function isValidEmail(email) {
    // This regex checks for: something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Save profile to localStorage
  function handleSave(e) {
    e.preventDefault();

    // Validate fields
    if (!profile.name || !profile.email || !profile.department) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Validate email format
    if (!isValidEmail(profile.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    setIsEditing(false);
    setMessage("Profile saved successfully! ✅");
  }

  // Get initials for the avatar circle
  function getInitials(name) {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>👤 Student Profile</h2>
        <p>View and manage your personal information</p>
      </div>

      <section className="section-box profile-section">
        {/* Avatar circle with initials */}
        <div className="profile-avatar">
          {getInitials(profile.name)}
        </div>

        {/* Show message if any */}
        {message && <p className="profile-message">{message}</p>}

        {isEditing ? (
          // Edit mode - show form
          <form onSubmit={handleSave} className="admin-form">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={profile.department}
              onChange={handleChange}
              placeholder="Enter your department"
              required
            />

            <div className="form-buttons">
              <button type="submit" className="event-card-btn">Save Profile</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // View mode - show profile details
          <div className="profile-view">
            <p><strong>Name:</strong> {profile.name || "Not set"}</p>
            <p><strong>Email:</strong> {profile.email || "Not set"}</p>
            <p><strong>Department:</strong> {profile.department || "Not set"}</p>
            <button
              className="event-card-btn"
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
