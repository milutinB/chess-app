import { createContext } from "react";
import { GameStateAction } from "./types/App.d";

export const GameStateDispatchContext: React.Context<React.Dispatch<GameStateAction>> 
= createContext(null);