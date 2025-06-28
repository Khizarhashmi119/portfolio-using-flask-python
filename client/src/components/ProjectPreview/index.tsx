import { useNavigate } from "react-router-dom";
import { IProject } from "../../types/entities/project";

import "./styles.scss";

interface Props {
  project: IProject;
}

const ProjectPreview = (props: Props) => {
  const { project } = props;

  const navigate = useNavigate();

  return (
    <div
      className="project-preview"
      onClick={() => navigate(`/projects/${project.uid}`)}
    >
      <img
        className="project-preview-img"
        src={`https://dummyimage.com/600x400/787878/000000.jpg`}
        alt="Project"
      />
      <h3 className="project-preview-title">{project.title}</h3>
    </div>
  );
};

export default ProjectPreview;
