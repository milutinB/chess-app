import { JoinForm } from "..";
import { ChangeEvent, useState } from "react";

export type JoiningProps = {
    submitCode: (s: string) => void,
    back: () => void
};



export function JoiningPage(props: JoiningProps) : JSX.Element {

    const [code, setCode] = useState('');

    function updateCode(e: ChangeEvent<HTMLInputElement>) {
        setCode(e.target.value);
    };

    return (
        <div className="joining-page">
            {/* <JoinForm submitCode={props.submitCode}/> */}
            <div className='code-input'>
                <span>
                    code:
                </span>
                <input id='code-input' value={code} onChange={e=>{updateCode(e)}}></input>
            </div>
            <div className="button-container">
                <button className="join-form-button" onClick={() => {props.submitCode(code)}}>join</button>
            </div>
            <div className="button-container">
                <button className="join-form-button" onClick={props.back}>back</button>
            </div>
        </div>
    );
}