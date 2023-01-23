import './styles.css';
import {IconAlarm, IconCrown, IconDeviceGamepad, IconDroplet} from "@tabler/icons";
import {useContext} from "react";
import {Context as TimeContext} from "../../../context/TimeProvider";

function Config() {
    const {time, setTime} = useContext(TimeContext);

    const handleClick = async (duration) => {
        if (time.started === false) {
            setTime(prevState => {
                return {...prevState, duration: duration};
            });
            await localStorage.setItem("time", duration);
        }
    }

    return (
        <div className={"config"}>
            <div className={"config-item"}>
                <div className={"tooltip"}>Colors</div>
                <IconDroplet stroke={2} style={{ color: "var(--text-color-third)"}} />
                <div className={"color background-color-primary"} />
                <div className={"color background-color-secondary"} />
                <div className={"color background-color-third"} />
                <div className={"color text-color-primary"} />
                <div className={"color text-color-secondary"} />
                <div className={"color text-color-third"} />
                <div className={"color text-color-fourth"} />
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}>Time</div>
                <IconAlarm stroke={2} style={{ color: "var(--text-color-third)"}}/>
                <div className={"time"} onClick={() => handleClick(30)}>30s</div>
                <div className={"time"} onClick={() => handleClick(60)}>1m</div>
                <div className={"time"} onClick={() => handleClick(120)}>2m</div>
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}> Game Mode</div>
                <IconDeviceGamepad stroke={2} style={{ color: "var(--text-color-third)"}} />
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}> Leaderboard </div>
                <IconCrown stroke={2} style={{ color: "var(--text-color-third)"}}/>
            </div>
        </div>
    );
}

export default Config;