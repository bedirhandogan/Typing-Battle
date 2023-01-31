import './styles.css';
import {IconAlarm, IconTextColor} from "@tabler/icons";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "context/StateProvider";

function Config() {
    const {state, dispatch} = useContext(Context);
    const [showColorArea, setShowColorArea] = useState(false);
    const colorSelectRef = useRef();

    const [colors, setColors] = useState(!localStorage.getItem("colors") ? localStorage.setItem("colors", JSON.stringify({
        textColorPrimary: "#d3a913",
        textColorSecondary: "#afafaf",
        textColorThird: "#5b5b5b",
        textColorFourth: "#d96060"
    })) : JSON.parse(localStorage.getItem("colors")));

    const handleTimeClick = (duration) => {
        if (state.time.started === false) {
            dispatch({ type: "time", value: {started: false, duration: duration}})
            localStorage.setItem("time", duration);
        }
    }

    const handleInput = (event, key) => {
        const newColors = JSON.parse(localStorage.getItem("colors"));

        const functions = {
            "1": async () => {
                newColors.textColorPrimary = event.target.value;
                document.documentElement.style.setProperty('--color-5', event.target.value);

                setColors(prevState => {
                    return { ...prevState, textColorPrimary: event.target.value };
                });

                await localStorage.setItem("colors", JSON.stringify(newColors));
            },
            "2": async () => {
                newColors.textColorSecondary = event.target.value;
                document.documentElement.style.setProperty('--color-6', event.target.value);

                setColors(prevState => {
                    return { ...prevState, textColorSecondary: event.target.value };
                });

                await localStorage.setItem("colors", JSON.stringify(newColors));
            },
            "3": async () => {
                newColors.textColorThird = event.target.value;
                document.documentElement.style.setProperty('--color-7', event.target.value);

                setColors(prevState => {
                    return { ...prevState, textColorThird: event.target.value };
                });

                await localStorage.setItem("colors", JSON.stringify(newColors));
            },
            "4": async () => {
                newColors.textColorFourth = event.target.value;
                document.documentElement.style.setProperty('--color-8', event.target.value);

                setColors(prevState => {
                    return { ...prevState, textColorFourth: event.target.value };
                });

                await localStorage.setItem("colors", JSON.stringify(newColors));
            },
        }


        functions[key.toString()]();
    }

    const handleClick = (event) => {
        if (!event.composedPath().includes(colorSelectRef.current)) {
            setShowColorArea(false);
        }
    };

    useEffect(() => {
        const colors = JSON.parse(localStorage.getItem("colors"));
        document.documentElement.style.setProperty('--color-5', colors.textColorPrimary);
        document.documentElement.style.setProperty('--color-6', colors.textColorSecondary);
        document.documentElement.style.setProperty('--color-7', colors.textColorThird);
        document.documentElement.style.setProperty('--color-8', colors.textColorFourth);

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className={"config"} style={{ opacity: state.inputFocus ? "0": "1" }}>
            <div className={"config-item"} ref={colorSelectRef}>
                <div className={"tooltip"}>Text Colors</div>
                <IconTextColor stroke={2} style={{ color: "var(--color-7)"}} />
                <div className={"colors"} onClick={() => state.time.started === false && setShowColorArea(prevState => !prevState)}>
                    <div className={"color text-color-primary"} style={{ background: colors.textColorPrimary }} />
                    <div className={"color text-color-secondary"} style={{ background: colors.textColorSecondary }} />
                    <div className={"color text-color-third"} style={{ background: colors.textColorThird }} />
                    <div className={"color text-color-fourth"} style={{ background: colors.textColorFourth }} />
                </div>

                <div className={"color-select"} style={showColorArea ? { display: "flex" } : { display: "none" }}>
                    <div className={"color-select-item"}>
                        <input
                            type={"color"}
                            style={{ background: colors.textColorPrimary }}
                            value={colors.textColorPrimary}
                            onInput={(event) => handleInput(event, 1)}
                        />
                        <div>{colors.textColorPrimary}</div>
                    </div>
                    <div className={"color-select-item"}>
                        <input
                            type={"color"}
                            style={{ background: colors.textColorSecondary }}
                            value={colors.textColorSecondary}
                            onInput={(event) => handleInput(event, 2)}
                        />
                        <div>{colors.textColorSecondary}</div>
                    </div>
                    <div className={"color-select-item"}>
                        <input
                            type={"color"}
                            style={{ background: colors.textColorThird }}
                            value={colors.textColorThird}
                            onInput={(event) => handleInput(event, 3)}
                        />
                        <div>{colors.textColorThird}</div>
                    </div>
                    <div className={"color-select-item"}>
                        <input
                            type={"color"}
                            style={{ background: colors.textColorFourth }}
                            value={colors.textColorFourth}
                            onInput={(event) => handleInput(event, 4)}
                        />
                        <div>{colors.textColorFourth}</div>
                    </div>
                </div>
            </div>

            <div className={"config-item"}>
                <div className={"tooltip"}>Time</div>
                <IconAlarm stroke={2} style={{ color: "var(--color-7)"}} />
                <div className={"time"} onClick={() => handleTimeClick(30)}>30s</div>
                <div className={"time"} onClick={() => handleTimeClick(60)}>1m</div>
                <div className={"time"} onClick={() => handleTimeClick(120)}>2m</div>
            </div>
        </div>
    );
}

export default Config;