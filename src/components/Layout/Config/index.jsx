import './styles.css';
import {BlendingModeIcon, KeyboardIcon, LapTimerIcon} from "@radix-ui/react-icons";

function Config() {
    return (
        <div className={"config"}>
            <div className={"config-item"}>
                <div className={"tooltip"}> Game Mode</div>
                <KeyboardIcon width={20} height={20} style={{ color: "var(--text-color-third)"}} />
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}>Time</div>
                <LapTimerIcon width={20} height={20} style={{ color: "var(--text-color-third)"}} />
                <div className={"time"}>30s</div>
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}>Colors</div>
                <BlendingModeIcon width={20} height={20} style={{ color: "var(--text-color-third)"}} />
                <div className={"color background-color-primary"} />
                <div className={"color background-color-secondary"} />
                <div className={"color background-color-third"} />
                <div className={"color text-color-primary"} />
                <div className={"color text-color-secondary"} />
                <div className={"color text-color-third"} />
                <div className={"color text-color-fourth"} />
            </div>
        </div>
    );
}

export default Config;