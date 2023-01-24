import './styles.css';
import {useContext} from "react";
import {Context as ScoreContext} from "../../../context/ScoreProvider";

function Indicator({name}) {
    const {score} = useContext(ScoreContext);
    const duration = localStorage.getItem("time");

    const [wpm, wcpm] = [
        (score.correctWord + score.wrongWord) / (duration === "30" ? 0.5 : duration),
        ((score.correctWord + score.wrongWord) - score.wrongWord) / (duration === "30" ? 0.5 : duration)
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