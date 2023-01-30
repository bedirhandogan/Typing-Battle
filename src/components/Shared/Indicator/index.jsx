import './styles.css';

function Indicator({name, value}) {
    return (
        <div className={"indicator"}>
            <div className={"indicator-name"}>{name}</div>
            <div>{name === "accuracy" || name === "wrong" ? `${Math.floor(value)}%` : Math.floor(value) }</div>
        </div>
    );
}

export default Indicator;