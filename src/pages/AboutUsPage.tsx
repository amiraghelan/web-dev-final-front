import config from "@data/configs.json";
import "@styles/pages/AboutUsPage.scss";

interface TeamMember {
  name: string;
  role: string;
}

interface AboutUsConfig {
  title: string;
  description: string;
  team?: TeamMember[];
  contact?: {
    email: string;
    phone: string;
  };
}

const AboutUsPage = () => {
  const aboutUs: AboutUsConfig = config.aboutUs;

  return (
    <div className="about-us">
      <main className="about-us-main">
        <h1 className="about-us-title animate-title">{aboutUs.title}</h1>
        <div className="about-us-description-card">
          <p className="about-us-description">{aboutUs.description}</p>
        </div>
        {aboutUs.team && aboutUs.team.length > 0 && (
          <section className="about-us-team">
            <h2 className="team-title">Our Team</h2>
            <div className="team-list">
              {aboutUs.team.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar" />
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {aboutUs.contact && (
          <section className="about-us-contact">
            <h2 className="contact-title">Contact Us</h2>
            <div className="contact-info">
              {aboutUs.contact.email && (
                <a href={`mailto:${aboutUs.contact.email}`} className="contact-button">
                  Email: {aboutUs.contact.email}
                </a>
              )}
              {aboutUs.contact.phone && (
                <a href={`tel:${aboutUs.contact.phone}`} className="contact-button">
                  Phone: {aboutUs.contact.phone}
                </a>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AboutUsPage;