import './styles.css';
import {IconReload} from "@tabler/icons";
import {useContext} from "react";
import Indicator from "components/Shared/Indicator";
import {Context} from "context/StateProvider";
import {calculateAccuracy, calculateWCPM, calculateWPM, calculateWrongs} from "utils";

function Score() {
    const {state, dispatch} = useContext(Context);
    const duration = localStorage.getItem("time");

    const indicators = [
        { name: "wpm", result: calculateWPM(state.score.correctLetter, state.score.wrongLetter, duration) },
        { name: "wcpm", result: calculateWCPM(state.score.correctLetter, state.score.wrongLetter, duration) },
        { name: "accuracy", result: calculateAccuracy(state.score.correctLetter, state.score.wrongLetter, duration) || 0 },
        { name: "wrong", result: calculateWrongs(state.score.correctLetter, state.score.wrongLetter, duration) || 0 },
    ];

    const handleClick = () => {
        dispatch({ type: 'showScoreArea', value: false });
        dispatch({ type: 'score', value: { correctLetter: 0, wrongLetter: 0 }});
    }

    return (
        <div className={"score"} style={state.showScoreArea ? {display: "flex"} : {display: "none"}}>
            <div className={"indicators"}>
                { indicators.map((v, i) => <Indicator name={v.name} value={v.result} key={i} />)}
            </div>

            <div className={"score-reload"}>
                Click to reload and write
                <div className={"score-close-btn"} onClick={handleClick}>
                    <IconReload style={{ color: "var(--color-5)"}}/>
                </div>
            </div>
        </div>
    );
}

export default Score;