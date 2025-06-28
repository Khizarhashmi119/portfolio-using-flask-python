import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { initState, projectsReducer } from "../reducers/projects";
import { TProjectsAction } from "../types/actions/projects";
import { IProjectsState } from "../types/states/projects";

export const ProjectsContext = createContext<
  [IProjectsState, Dispatch<TProjectsAction>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const ProjectsContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [projectsState, dispatch] = useReducer(projectsReducer, initState);

  return (
    <ProjectsContext.Provider value={[projectsState, dispatch]}>
      {children}
    </ProjectsContext.Provider>
  );
};
