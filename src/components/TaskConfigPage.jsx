import { useState } from "react";
import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {
    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59", "#962a96"];
    // blue, red, orange, green, purple
    const [currentColor, setCurrentColor] = useState(0);
    const [periodDropdownDisplay, setPeriodDropdownDisplay] = useState("none");

    let taskConfig = {
        buildOrQuit: "",
        name: "",
        period: "",
        emoji: "",
        color: "",
        start: "",
        goal: null,
        reminders: [],
    }

    const cycleColor = () => {
        setCurrentColor((currentColor + 1) % colors.length);
    }

    const togglePeriodDropdown = () => {
        if (periodDropdownDisplay === "none") {
            setPeriodDropdownDisplay("flex");
        } else {
            setPeriodDropdownDisplay("none");
        }
    }

    const handleNameInput = (event) => {
        taskConfig.name = event.target.value;
        console.log(`The name is ${taskConfig.name}`)
    }

    const handleAmountInput = (event) => {
        taskConfig.goal = Number(event.target.value);
        console.log(`The name is ${taskConfig.goal}`)
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
                    <input type="text" onChange={(event) => { handleNameInput(event) }}></input>
                </div>

                <div className="task-config-form__field">
                    <label>PERIOD</label>
                    <div className="task-config-form__dropdown form-input" onClick={togglePeriodDropdown}>
                        Every day
                        {periodDropdownDisplay === "none" ? <span className="task-config-form__dropdown-icon fa-solid fa-chevron-down"></span> :
                            <span className="task-config-form__dropdown-icon fa-solid fa-chevron-up"></span>}
                        <ul className="task-config-form__dropdown-content" style={{ display: periodDropdownDisplay }}>
                            <li>Hello</li>
                        </ul>
                    </div>
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
                <div className="task-config-form__field">
                    <label>AMOUNT PER PERIOD</label>
                    <input type="number" min={1} onChange={(event) => { handleAmountInput(event) }}></input>
                </div>

                <button className="task-config-form__submit" type="submit">Create Task</button>
            </form>
        </div>
    )
}

export default TaskConfigPage;