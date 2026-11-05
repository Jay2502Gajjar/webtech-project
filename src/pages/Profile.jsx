import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) {
      setProfile(saved);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        setProfile({
          name: user.name,
          email: `${user.studentId ? user.studentId.toLowerCase() : "student"}@college.edu`,
          department: "Computer Science & Engineering",
        });
      }
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  function handleSave(e) {
    e.preventDefault();

    if (!profile.name.trim() || !profile.email.trim() || !profile.department.trim()) {
      setStatusMessage("Please fill in all profile fields.");
      return;
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    setIsEditing(false);
    setStatusMessage("Profile details updated successfully.");
  }

  function getInitials(name) {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Student Profile</h2>
        <p>Manage your student record and departmental communication details</p>
      </div>

      <section className="section-box profile-section">
        <div className="profile-avatar">
          {getInitials(profile.name)}
        </div>

        {statusMessage && <div className="profile-message">{statusMessage}</div>}

        {isEditing ? (
          <form onSubmit={handleSave} className="admin-form" style={{ width: "100%" }}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <label htmlFor="email">College Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              required
            />

            <label htmlFor="department">Academic Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={profile.department}
              onChange={handleChange}
              placeholder="e.g. Information Technology"
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
          <div className="profile-view" style={{ width: "100%" }}>
            <p><strong>Student Name:</strong> {profile.name || "Not specified"}</p>
            <p><strong>Email Address:</strong> {profile.email || "Not specified"}</p>
            <p><strong>Department:</strong> {profile.department || "Not specified"}</p>

            <button
              type="button"
              className="event-card-btn"
              onClick={() => {
                setIsEditing(true);
                setStatusMessage("");
              }}
              style={{ marginTop: "12px" }}
            >
              Edit Profile Information
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
