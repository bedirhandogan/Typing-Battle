import './styles.css';
import {IconBackspace, IconSpace} from "@tabler/icons";

function Key({value}) {
    return <div className={`key ${value.key === "empty" ? "empty" : value.key === " " ? "space" : value.key}`} id={value.active}>
        {
            value.key === "empty" ? " " :
            value.key === " " ? <IconSpace stroke={1} /> :
            value.key === "backspace" ? <IconBackspace stroke={1} width={23} /> : value.key.toUpperCase()
        }
    </div>;
}

export default Key;