import ProjectPreview from "../ProjectPreview";

import { IProject } from "../../types/entities/project";

import "./styles.scss";

interface Props {
  projects: IProject[];
}

const ProjectPreviews = (props: Props): JSX.Element => {
  const { projects } = props;

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectPreview key={project.uid} project={project} />
      ))}
    </div>
  );
};

export default ProjectPreviews;
