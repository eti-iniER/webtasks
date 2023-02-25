import { useState } from "react";
import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {
    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59"];
    const [currentColor, setCurrentColor] = useState(0);
    let taskConfig = {
        buildOrQuit: "",
        name: "",
        period: "",
        emoji: "",
        color: "",
        start: "",
        reminders: [],
    }

    const cycleColor = () => {
        setCurrentColor((currentColor + 1) % colors.length);
    }
    return (
        <div className="task-config-page">
            <form className="task-config-form">
                <div className="task-config-form__field">
                    <label>BUILD OR QUIT THIS HABIT?</label>
                    <input type="text"></input>
                </div>

                <div className="task-config-form__field">
                    <label>HABIT NAME</label>
                    <input type="text"></input>
                </div>

                <div className="task-config-form__field">
                    <label>PERIOD</label>
                    <input type="text" placeholder="Tap to select period..."></input>
                </div>

                <div className="task-config-form__emoji-colour-container">
                    <div className="task-config-form__field color">
                        <label>EMOJI</label>
                        <div className="task-config-form__emoji-picker"><span className="task-config-form__emoji-picker-emoji">➗</span></div>
                    </div>

                    <div className="task-config-form__field color">
                        <label>COLOR</label>
                        <div className="task-config-form__color-picker" style={{ borderColor: colors[currentColor], backgroundColor: colors[currentColor] }} onClick={cycleColor}><span className="fa-solid fa-palette"></span></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskConfigPage;