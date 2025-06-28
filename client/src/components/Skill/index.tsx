import "./styles.scss";

interface Props {
  skill: string;
}

const Skill = (props: Props): JSX.Element => {
  const { skill } = props;

  return <li className="skill">#{skill}</li>;
};

export default Skill;
