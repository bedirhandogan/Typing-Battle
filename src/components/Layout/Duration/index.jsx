import './styles.css';
import {useContext} from "react";
import {Context as TimeContext} from "../../../context/TimeProvider";

function Duration() {
    const { time } = useContext(TimeContext);

    return <div className={"duration"}>{time}</div>;
}

export default Duration;