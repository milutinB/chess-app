import { HistoryButtonProps } from "../types/App.d";
import { GameState } from "../types/App.d";
import { GameStateContext } from "../GameStateContext";
import { useContext } from "react";

export default function HistoryButton(props: HistoryButtonProps) : JSX.Element {
    let state: GameState = useContext(GameStateContext);
    let buttonDisabled: boolean;

    if (props.timeTravelDir == 1) 
        buttonDisabled = state.historyIndex == state.previousBoards.length - 1;
    

    if (props.timeTravelDir == -1) 
        buttonDisabled = state.historyIndex == 0;
    

    
    return (
        <button
            className="history-button"
            disabled={buttonDisabled}
            onClick={()=>{props.historyClick(props.timeTravelDir)}}>
            {props.timeTravelDir == -1 ? "<" : ">"}
        </button>
    );
}