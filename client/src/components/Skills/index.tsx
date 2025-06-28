import { Fragment } from "react";

import { ISkill } from "../../types/entities/Skill";
import Skill from "../Skill";

import "./styles.scss";

interface Props {
  skills: ISkill[];
}

const Skills = (props: Props): JSX.Element => {
  const { skills } = props;

  return (
    <Fragment>
      {skills.length ? (
        skills.map(({ uid, name }) => (
          <Skill key={`${name}-${uid}`} skill={name} />
        ))
      ) : (
        <h2 className="message">No skill yet.</h2>
      )}
    </Fragment>
  );
};

export default Skills;
