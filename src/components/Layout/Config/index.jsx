import './styles.css';
import {IconAlarm, IconCrown, IconDeviceGamepad, IconDroplet} from "@tabler/icons";

function Config() {
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
                <div className={"time"}>30s</div>
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