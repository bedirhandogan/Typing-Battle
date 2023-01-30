import './styles.css';
import {IconReload} from "@tabler/icons";
import {useContext} from "react";
import Indicator from "components/Shared/Indicator";
import {Context} from "context/StateProvider";

function Score() {
    const {state, dispatch} = useContext(Context);
    const duration = localStorage.getItem("time");

    const [wpm, wcpm] = [
        (state.score.correctWord + state.score.wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration),
        ((state.score.correctWord + state.score.wrongWord) - state.score.wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration)
    ]

    const [accuracy, wrong] = [
        ((wcpm / wpm) * 100),
        100 - ((wcpm / wpm) * 100)
    ]

    const indicators = [
        { name: "wpm", result: wpm },
        { name: "wcpm", result: wcpm },
        { name: "accuracy", result: accuracy },
        { name: "wrong", result: wrong },
    ];

    const handleClick = () => {
        dispatch({ type: 'showScoreArea', value: false });
        dispatch({ type: 'score', value: { correctWord: 0, wrongWord: 0 }})
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