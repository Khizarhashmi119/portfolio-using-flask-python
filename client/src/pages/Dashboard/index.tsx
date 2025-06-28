import { useNavigate } from "react-router-dom";

// import SkillForm from "../../components/SkillForm/SkillForm";
// import DashboardSkillsList from "../../components/DashboardSkillsList/DashboardSkillsList";
// import DashboardProjectsList from "../../components/DashboardProjectsList/DashboardProjectsList";

import "./DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-project");
  };

  return (
    <main>
      <section id="dashboard">
        <div className="container">
          <div className="dashboard-add-skill-form-container">
            {/* <SkillForm /> */}
          </div>
          {/* <DashboardSkillsList /> */}
          <hr className="divider" />
          <div className="dashboard-add-project-btn-container">
            <button className="dashboard-add-project-btn" onClick={handleClick}>
              <i className="fas fa-plus"></i> Project
            </button>
          </div>
          {/* <DashboardProjectsList /> */}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
