export type LandingProps = {
    createGame: () => void,
    joinGame: () => void
};

export function Landing(props: LandingProps) : JSX.Element {
    return (
        <div className='landing'>
                <div className="button-container">
                    <button className="landing-button" 
                            onClick={props.createGame}>
                                create game
                    </button>
                </div>
                <div className="button-container">
                    <button 
                        className="landing-button"
                        onClick={props.joinGame}>
                            join game
                    </button>
                </div>
        </div>
    );

}