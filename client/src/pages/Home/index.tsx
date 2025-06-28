import {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import ProjectPreviews from "../../components/ProjectPreviews";
import Skills from "../../components/Skills";

import { TTheme } from "../../types/theme";
import { ThemeContext } from "../../context/Theme";
import { ProjectsContext } from "../../context/Projects";
import { getProjects } from "../../api/getProjects";
import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
} from "../../actionTypes/projects";
import { STATUS_SUCCESS } from "../../constants";
import { SkillsContext } from "../../context/Skills";

import "./styles.scss";
import {
  GET_SKILLS,
  GET_SKILLS_FAIL,
  GET_SKILLS_SUCCESS,
} from "../../actionTypes/skills";
import { getSkills } from "../../api/getSkills";

const HomePage = () => {
  const themeContext = useContext(ThemeContext);
  const projectsContext = useContext(ProjectsContext);
  const skillsContext = useContext(SkillsContext);
  const [contactData, setContactData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });
  const { name, email, subject, message } = contactData;
  const [, setTheme] = themeContext || [];
  const [projectsState, projectsDispatch] = projectsContext || [];
  const { isLoading: isProjectsLoading, projects } = projectsState || {};
  const [skillsState, skillsDispatch] = skillsContext || [];
  const { isLoading: isSkillsLoading, skills } = skillsState || {};

  useEffect(() => {
    projectsDispatch!({ type: GET_PROJECTS });
    getProjects(2)
      .then(({ status, data }) => {
        if (status === STATUS_SUCCESS)
          projectsDispatch!({
            type: GET_PROJECTS_SUCCESS,
            payload: data.projects,
          });
        else projectsDispatch!({ type: GET_PROJECTS_FAIL });
      })
      .catch(() => {
        projectsDispatch!({ type: GET_PROJECTS_FAIL });
      });
  }, [projectsDispatch]);

  useEffect(() => {
    skillsDispatch!({ type: GET_SKILLS });
    getSkills()
      .then(({ status, data }) => {
        if (status === STATUS_SUCCESS)
          skillsDispatch!({
            type: GET_SKILLS_SUCCESS,
            payload: data.skills,
          });
        else skillsDispatch!({ type: GET_SKILLS_FAIL });
      })
      .catch(() => {
        skillsDispatch!({ type: GET_SKILLS_FAIL });
      });
  }, [skillsDispatch]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const { theme } = event.currentTarget.dataset;
    if (theme) {
      setTheme!(theme as TTheme);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {};

  return (
    <Fragment>
      <main>
        <section id="title">
          <div className="container">
            <div className="terminal">
              <div className="terminal-top">
                <div className="dot-1"></div>
                <div className="dot-2"></div>
                <div className="dot-3"></div>
              </div>
              <div className="terminal-bottom">
                <h2 className="title">
                  Hi 👋, I'm <span className="name">Khizar</span>.
                </h2>
                <p className="sub-title">A full stack web developer.</p>
                <div className="theme-dots">
                  <div
                    className="theme-dot-1"
                    data-theme="light"
                    onClick={handleClick}
                  ></div>
                  <div
                    className="theme-dot-2"
                    data-theme="dark"
                    onClick={handleClick}
                  ></div>
                </div>
                <p className="setting-note">
                  <i>*theme setting will be save for your next visit.</i>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="container">
            <h2 className="about-title">More about me</h2>
            <p className="about-me">
              I'm a full-stack web developer lives in Delhi, India.
              <br />I make web applications usually with React and Node.js.
              <br />
              Feel free to take a look at my projects.
            </p>
            <div className="social-links">
              <a
                className="social-link"
                href="https://github.com/Khizarhashmi119"
              >
                <i className="fab fa-github-alt fa-2x"></i>
              </a>
              <a
                className="social-link"
                href="https://www.linkedin.com/in/khizarhashmi119/"
              >
                <i className="fab fa-linkedin-in fa-2x"></i>
              </a>
              <a
                className="social-link"
                href="https://twitter.com/khizarhashmi119"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            </div>
            <hr className="divider" />
            <h3 className="skills-title">Top Expertise</h3>
            <ul className="skills">
              {!isSkillsLoading && skills ? (
                <Skills skills={skills} />
              ) : (
                <Loader />
              )}
            </ul>
          </div>
        </section>
        <section id="projects-preview">
          <div className="container">
            <h2 className="projects-preview-title">
              Some of my past projects.
            </h2>
            {!isProjectsLoading && projects ? (
              projects.length ? (
                <Fragment>
                  <ProjectPreviews projects={projects} />
                  <div className="projects-page-link">
                    <Link to="/projects">More projects</Link>
                  </div>
                </Fragment>
              ) : (
                <h2 className="message">No project yet.</h2>
              )
            ) : (
              <Loader />
            )}
          </div>
        </section>
        <section id="contact">
          <div className="container">
            <h2 className="contact-title">Contact me</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                className="contact-input-name"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="contact-input-email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <label htmlFor="subject">Subject:</label>
              <input
                id="subject"
                className="contact-input-subject"
                type="text"
                name="subject"
                value={subject}
                onChange={handleChange}
                required
              />
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                className="contact-message"
                name="message"
                value={message}
                cols={30}
                rows={7}
                onChange={handleChange}
                required
              ></textarea>
              <Button className="contact-btn" type="submit">
                Send
              </Button>
            </form>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default HomePage;
