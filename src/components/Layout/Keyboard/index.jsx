import './styles.css';
import {EraserIcon, MinusIcon} from "@radix-ui/react-icons";
import {useCallback, useEffect, useState} from "react";

function Keyboard() {
    const [keys, setKeys] = useState([
        { key: "a", active: "false" },
        { key: "b", active: "false" },
        { key: "c", active: "false" },
        { key: "d", active: "false" },
        { key: "e", active: "false" },
        { key: "f", active: "false" },
        { key: "g", active: "false" },
        { key: "h", active: "false" },
        { key: "ı", active: "false" },
        { key: "j", active: "false" },
        { key: "empty", active: "false" },
        { key: "k", active: "false" },
        { key: "l", active: "false" },
        { key: "m", active: "false" },
        { key: "n", active: "false" },
        { key: "o", active: "false" },
        { key: "p", active: "false" },
        { key: "q", active: "false" },
        { key: "r", active: "false" },
        { key: "s", active: "false" },
        { key: "empty", active: "false" },
        { key: "t", active: "false" },
        { key: "u", active: "false" },
        { key: "v", active: "false" },
        { key: "w", active: "false" },
        { key: " ", active: "false" },
        { key: "x", active: "false" },
        { key: "y", active: "false" },
        { key: "z", active: "false" },
        { key: "backspace", active: "false" },
    ]);

    const keyPressHandler = useCallback(event => {
        setKeys(keys.map(v => {
            if (v.key === event.key.toLowerCase()) {
                return {...v, active: "true"}
            } else return v;
        }));
    }, [keys]);

    const keyUpHandler = useCallback(() => {
        setKeys(keys.map(v => {
            if (v.active === "true") {
                return {...v, active: "false"}
            } else return v;
        }));
    }, [keys]);

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        document.addEventListener("keyup", keyUpHandler);

        return () => {
            document.removeEventListener("keydown", keyPressHandler);
            document.removeEventListener("keyup", keyUpHandler);
        }
    }, [keyPressHandler, keyUpHandler]);

    return (
        <div className={"keyboard"}>
            { keys.map((v, i) => {
                return <div className={`key ${v.key === "empty" ? "empty" :
                    v.key === " " ? "space": ""}`} id={v.active} key={i}>
                    {
                        v.key === "empty" ? " " :
                        v.key === " " ? <MinusIcon /> :
                        v.key === "backspace" ? <EraserIcon width={16} /> : v.key.toUpperCase()
                    }
                </div>
            }) }
        </div>
    );
}

export default Keyboard;