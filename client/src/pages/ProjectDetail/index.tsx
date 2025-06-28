import { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../components/shared/Loader";
import Skills from "../../components/Skills";

import {
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
} from "../../actionTypes/project";
import { getProject } from "../../api/getProject";
import { STATUS_SUCCESS } from "../../constants";
import { ProjectContext } from "../../context/Project";
// import Moment from "react-moment";

import "./styles.scss";

const ProjectDetailPage = () => {
  const projectContext = useContext(ProjectContext);
  const [projectState, dispatch] = projectContext || [];
  const { isLoading, project } = projectState || {};
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch!({ type: GET_PROJECT });
      getProject(id)
        .then(({ status, data }) => {
          if (status === STATUS_SUCCESS)
            dispatch!({ type: GET_PROJECT_SUCCESS, payload: data.project });
          else dispatch!({ type: GET_PROJECT_FAIL });
        })
        .catch(() => {
          dispatch!({ type: GET_PROJECT_FAIL });
        });
    }
  }, [dispatch, id]);

  return (
    <main>
      <section id="project-detail-page">
        <div className="container">
          {!isLoading && project ? (
            <Fragment>
              <div className="project-links">
                {project.repo_url && (
                  <a href={project.repo_url} className="project-link">
                    <i className="fab fa-github"></i>
                  </a>
                )}
                {project.url && (
                  <a href={project.url} className="project-link">
                    <i className="fas fa-external-link-square-alt"></i>
                  </a>
                )}
              </div>
              <img
                className="project-img"
                src={project.cover_image_url}
                alt="Project"
              />
              <h2 className="project-title">{project.title}</h2>
              <ul className="project-skills">
                <Skills skills={project.skills} />
              </ul>
              <div
                className="project-detail"
                dangerouslySetInnerHTML={{
                  __html: project.description,
                }}
              ></div>
              <div className="project-date">Date: {project.updated_at}</div>
            </Fragment>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectDetailPage;
