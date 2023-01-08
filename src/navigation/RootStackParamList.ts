import { Screen } from './Screen';

type EmptyObject = Record<string, never>;

export type RootStackParamList = {
  [Screen.Game]?: EmptyObject;
};
