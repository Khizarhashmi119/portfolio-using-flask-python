import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { initState, projectReducer } from "../reducers/project";
import { TProjectAction } from "../types/actions/project";
import { IProjectState } from "../types/states/project";

export const ProjectContext = createContext<
  [IProjectState, Dispatch<TProjectAction>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const ProjectContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [projectState, dispatch] = useReducer(projectReducer, initState);

  return (
    <ProjectContext.Provider value={[projectState, dispatch]}>
      {children}
    </ProjectContext.Provider>
  );
};
