import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { initState, skillsReducer } from "../reducers/skills";
import { TSkillsAction } from "../types/actions/skills";
import { ISkillsState } from "../types/states/skills";

export const SkillsContext = createContext<
  [ISkillsState, Dispatch<TSkillsAction>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const SkillsContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [skillsState, dispatch] = useReducer(skillsReducer, initState);

  return (
    <SkillsContext.Provider value={[skillsState, dispatch]}>
      {children}
    </SkillsContext.Provider>
  );
};
