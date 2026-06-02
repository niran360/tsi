export default function BecomePartnerPage({ formData, submitted, onFormChange, onFormSubmit }) {
  return (
    <main>
      <section className="section section-contact">
        <h2>Start Your Journey</h2>
        <p className="submit-video-text">
          Partner with Talent Search Initiative to support player growth,
          sponsor development programs, or connect athletes to opportunity.
        </p>
        <div className="contact-container">
          <form className="registration-form" onSubmit={onFormSubmit}>
            {submitted && <p className="form-success">✓ Registration received! We will be in touch.</p>}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onFormChange}
                placeholder="Player's full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Age Group</label>
              <select name="ageGroup" value={formData.ageGroup} onChange={onFormChange} required>
                <option value="">Select age group</option>
                <option value="U-12">U-12</option>
                <option value="U-14">U-14</option>
                <option value="U-16">U-16</option>
                <option value="U-18">U-18</option>
                <option value="U-20">U-20</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="form-group">
              <label>Position</label>
              <select name="position" value={formData.position} onChange={onFormChange} required>
                <option value="">Select position</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Attacker">Attacker</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onFormChange}
                placeholder="City or area"
                required
              />
            </div>
            <button type="submit" className="cta">Register For Trials</button>
          </form>
          <div className="contact-details">
            <h3>Contact Details</h3>
            <ul className="contact-list">
              <li>Email: info@talentsearchinitative.org</li>
              <li>Phone: +234 000 000 0000</li>
              <li className="contact-address">
                <strong>Address:</strong><br />
                39 Adebayo Mokuolu Street, Anthony Village,
                Lagos, Nigeria.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

