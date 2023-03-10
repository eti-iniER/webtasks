import "./FloatingControlPanel.css";

const FloatingControlPanel = (props) => {
    return (
        <div className="floating-control-panel">
            <button className="control-panel-button"><span className="fa-solid fa-boxes"></span></button>
            <button className="control-panel-button"><span className="fa-solid fa-check"></span></button>
            <button className="control-panel-button"><span className="fa-solid fa-wrench"></span></button>
            <button className="control-panel-button"><span className="fa-solid fa-globe"></span></button>
        </div>
    )
}

export default FloatingControlPanel;