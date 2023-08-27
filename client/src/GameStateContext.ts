import { createContext } from "react";
import { GameState } from "./types/App.d";

export const GameStateContext: React.Context<GameState>
= createContext(null);