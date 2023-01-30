import './styles.css';

function Indicator({name, value}) {
    return (
        <div className={"indicator"}>
            <div className={"indicator-name"}>{name}</div>
            <div>{value.toString().slice(0, 5)}</div>
        </div>
    );
}

export default Indicator;