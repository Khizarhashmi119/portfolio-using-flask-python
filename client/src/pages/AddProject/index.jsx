import React from "react";

import ProjectForm from "../../components/ProjectForm/ProjectForm";
import Alerts from "../../components/Alerts/Alerts";

import "./AddProjectPage.css";

const AddProjectPage = () => {
  return (
    <section id="add-project">
      <div className="container">
        <h1 className="add-project-title">Add project</h1>
        <Alerts />
        <ProjectForm type="add" />
      </div>
    </section>
  );
};

export default AddProjectPage;
