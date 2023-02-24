import "./ChoicePage.css";

const ChoicePage = (props) => {
    return (
        <div className="choice-page" style={{ display: props.displayState }}>
            {props.children}
        </div>
    )
}

export default ChoicePage;