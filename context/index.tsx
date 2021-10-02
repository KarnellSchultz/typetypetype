import {
  ApplicationStateProvider,
  useApplicationState,
} from "./AppContext/ApplicationStateContext";
import { WordDataContextProvider, useWordDataContext } from "./WordDataContext";
import {
  Status,
  State as WordObjStateType,
  WordDataType,
} from "./AppContext/types";

export {
  WordDataContextProvider,
  useWordDataContext,
  ApplicationStateProvider,
  useApplicationState,
  Status,
};
export type { WordObjStateType, WordDataType };
