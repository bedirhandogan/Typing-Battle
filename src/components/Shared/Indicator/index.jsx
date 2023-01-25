import './styles.css';
import {useContext} from "react";
import {Context} from "context/StateProvider";

function Indicator({name}) {
    const {state} = useContext(Context);
    const duration = localStorage.getItem("time");

    const [wpm, wcpm] = [
        (state.score.correctWord + state.score.wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration),
        ((state.score.correctWord + state.score.wrongWord) - state.score.wrongWord) / (duration === "30" ? 0.5 : duration === "60" ? 1 : duration === "120" ? 2 : duration)
    ]

    const [accuracy, wrong] = [
        ((wcpm / wpm) * 100),
        100 - ((wcpm / wpm) * 100)
    ]

    return (
        <div className={"indicator"}>
            <div className={"indicator-name"}>{name}</div>
            <div>
                {
                    name === "wpm" ? wpm :
                    name === "wcpm" ? wcpm :
                    name === "accuracy" ? `%${accuracy.toString().slice(0, 5)}` :
                    name === "wrong" ? `%${wrong.toString().slice(0, 5)}` : ""
                }
            </div>
        </div>
    );
}

export default Indicator;