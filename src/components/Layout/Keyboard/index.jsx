import './styles.css';
import {useCallback, useEffect, useState} from "react";
import {IconBackspace, IconSpace} from "@tabler/icons";

function Keyboard() {
    const [keys, setKeys] = useState([
        { key: "q", active: "false" },
        { key: "w", active: "false" },
        { key: "e", active: "false" },
        { key: "r", active: "false" },
        { key: "t", active: "false" },
        { key: "y", active: "false" },
        { key: "u", active: "false" },
        { key: "ı", active: "false" },
        { key: "o", active: "false" },
        { key: "p", active: "false" },
        { key: "empty", active: "false" },
        { key: "a", active: "false" },
        { key: "s", active: "false" },
        { key: "d", active: "false" },
        { key: "f", active: "false" },
        { key: "g", active: "false" },
        { key: "h", active: "false" },
        { key: "j", active: "false" },
        { key: "k", active: "false" },
        { key: "l", active: "false" },
        { key: "empty", active: "false" },
        { key: "z", active: "false" },
        { key: "x", active: "false" },
        { key: "c", active: "false" },
        { key: "v", active: "false" },
        { key: " ", active: "false" },
        { key: "b", active: "false" },
        { key: "n", active: "false" },
        { key: "m", active: "false" },
        { key: "backspace", active: "false" },
    ]);

    const handleKeyDown = useCallback(event => {
        setKeys(keys.map(v => {
            if (v.key === event.key.toLowerCase()) {
                return {...v, active: "true"}
            } else return v;
        }));
    }, [keys]);

    const handleKeyUp = useCallback(() => {
        setKeys(keys.map(v => {
            if (v.active === "true") {
                return {...v, active: "false"}
            } else return v;
        }));
    }, [keys]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp]);

    return (
        <div className={"keyboard"}>
            { keys.map((v, i) => {
                return <div className={`key ${v.key === "empty" ? "empty" : v.key === " " ? "space" : v.key}`} id={v.active} key={i}>
                    {
                        v.key === "empty" ? " " :
                        v.key === " " ? <IconSpace stroke={1} /> :
                        v.key === "backspace" ? <IconBackspace stroke={1} width={23} /> : v.key.toUpperCase()
                    }
                </div>
            }) }
        </div>
    );
}

export default Keyboard;