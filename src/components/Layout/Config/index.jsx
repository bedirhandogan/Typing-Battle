import './styles.css';
import {GearIcon, PersonIcon} from "@radix-ui/react-icons";

function ConfigItem({tip, icon}) {
    return (
        <div className={"config-item"}>
            {icon}
            <div className={"tooltip"}>{tip}</div>
        </div>
    );
}

function Config() {
    return (
        <div className={"config"}>
            <div className={"config-items"}>
                <ConfigItem
                    tip={"1v1"}
                    icon={<PersonIcon width={20} height={20} color={"grey"} /> }
                />
                <ConfigItem
                    tip={"Setting"}
                    icon={<GearIcon width={20} height={20} color={"grey"} />}
                />
            </div>
        </div>
    );
}

export default Config;