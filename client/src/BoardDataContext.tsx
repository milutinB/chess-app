import { createContext } from "react";
import { PlayerColor } from "./types/Types2.d";

export const ActivePlayerContext: React.Context<PlayerColor> =createContext('w');
