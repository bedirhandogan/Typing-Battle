import './styles.css';
import {IconAlarm, IconCrown, IconDeviceGamepad, IconDroplet} from "@tabler/icons";
import {useContext} from "react";
import {Context} from "../../../context/StateProvider";

function Config() {
    const {state, dispatch} = useContext(Context);

    const handleClick = async (durations) => {
        if (state.time.started === false) {
            dispatch({ type: "time", value: {started: false, duration: durations}})
            await localStorage.setItem("time", durations);
        }
    }

    return (
        <div className={"config"}>
            <div className={"config-item"}>
                <div className={"tooltip"}>Colors</div>
                <IconDroplet stroke={2} style={{ color: "var(--color-7)"}} />
                <div className={"color text-color-primary"} />
                <div className={"color text-color-secondary"} />
                <div className={"color text-color-third"} />
                <div className={"color text-color-fourth"} />
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}>Time</div>
                <IconAlarm stroke={2} style={{ color: "var(--color-7)"}} />
                <div className={"time"} onClick={() => handleClick(30)}>30s</div>
                <div className={"time"} onClick={() => handleClick(60)}>1m</div>
                <div className={"time"} onClick={() => handleClick(120)}>2m</div>
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}> Game Mode</div>
                <IconDeviceGamepad stroke={2} style={{ color: "var(--color-7)"}} />
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}> Leaderboard </div>
                <IconCrown stroke={2} style={{ color: "var(--color-7)"}} />
            </div>
        </div>
    );
}

export default Config;