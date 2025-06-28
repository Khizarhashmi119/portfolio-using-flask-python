import { useContext, useEffect } from "react";
import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
} from "../../actionTypes/projects";
import { getProjects } from "../../api/getProjects";
import ProjectPreviews from "../../components/ProjectPreviews";
import Loader from "../../components/shared/Loader";
import { STATUS_SUCCESS } from "../../constants";
import { ProjectsContext } from "../../context/Projects";

import "./styles.scss";

const ProjectsPage = (): JSX.Element => {
  const projectsContext = useContext(ProjectsContext);
  const [projectsState, dispatch] = projectsContext || [];
  const { isLoading, projects } = projectsState || {};

  useEffect(() => {
    dispatch!({ type: GET_PROJECTS });
    getProjects()
      .then(({ status, data }) => {
        if (status === STATUS_SUCCESS)
          dispatch!({ type: GET_PROJECTS_SUCCESS, payload: data.projects });
        else dispatch!({ type: GET_PROJECTS_FAIL });
      })
      .catch(() => {
        dispatch!({ type: GET_PROJECTS_FAIL });
      });
  }, [dispatch]);

  return (
    <main>
      <section id="projects">
        <div className="container">
          <h2 className="projects-title">My projects</h2>
          {!isLoading && projects ? (
            projects.length ? (
              <ProjectPreviews projects={projects} />
            ) : (
              <h3 className="message">No project yet.</h3>
            )
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
