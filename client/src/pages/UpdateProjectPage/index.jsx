import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getProjectAction } from "../../redux/actions/projectsActions";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import Alerts from "../../components/Alerts/Alerts";

import "./UpdateProjectPage.css";

const UpdateProjectPage = () => {
  const { project, isLoading } = useSelector((state) => state.projectsState);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectAction(id));
  }, [dispatch, id]);

  return (
    <section id="update-project">
      <div className="container">
        <h1 className="edit-project-title">Edit project</h1>
        <Alerts />
        {!isLoading ? (
          project ? (
            <ProjectForm type="update" project={project} />
          ) : (
            <h2 className="loading-text">Loading...</h2>
          )
        ) : (
          <h2 className="loading-text">Loading...</h2>
        )}
      </div>
    </section>
  );
};

export default UpdateProjectPage;
