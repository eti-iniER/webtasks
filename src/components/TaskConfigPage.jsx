import { useEffect, useRef, useState } from "react";
import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {
    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59", "#962a96"];
    const colorThemes = ["blue", "red", "orange", "green", "purple"];
    // blue, red, orange, green, purple
    const [currentColor, setCurrentColor] = useState(0);
    const [periodDropdownDisplay, setPeriodDropdownDisplay] = useState("none");
    const [seconds, setSeconds] = useState("");
    const [minutes, setMinutes] = useState("");
    const [hours, setHours] = useState("");

    let taskConfig = {
        buildOrQuit: "",
        name: "",
        period: "",
        emoji: "",
        theme: "",
        start: "",
        goal: null,
        reminders: [],
    }

    useEffect(() => {
        taskConfig.goal = Number(hours * 3600) + Number(minutes * 60) + Number(seconds);
        console.log(`The total time is ${taskConfig.goal} seconds`);

    }, [hours, minutes, seconds])

    const cycleColor = () => {
        taskConfig.theme = colorThemes[(currentColor + 1) % colors.length];
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

    const handleSecondsInput = (event) => {
        setSeconds(event.target.value);
    }

    const handleMinutesInput = (event) => {
        setMinutes(event.target.value);
    }

    const handleHoursInput = (event) => {
        setHours(event.target.value);
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

                <div className="task-config-form__field time-container">
                    <span className="task-config-form__label">LENGTH OF TIME</span>
                    <div className="task-config-form__time">
                        <div className="task-config-form__field">
                            <input type="number" placeholder="hours" onChange={(event) => { handleHoursInput(event) }} min={0} max={100} value={hours}></input>
                        </div>
                        <div className="task-config-form__field">
                            <input type="number" placeholder="minutes" onChange={(event) => { handleMinutesInput(event) }} min={0} max={59} value={minutes}></input>
                        </div>
                        <div className="task-config-form__field">
                            <input type="number" placeholder="seconds" onChange={(event) => { handleSecondsInput(event) }} min={0} max={59} value={seconds}></input>
                        </div>
                    </div>
                </div>

                <div className="task-config-form__field">
                    <label>PERIOD</label>
                    <div className="task-config-form__dropdown form-input" onClick={togglePeriodDropdown}>
                        Every day
                        {periodDropdownDisplay === "none" ? <span className="task-config-form__dropdown-icon fa-solid fa-chevron-down"></span> :
                            <span className="task-config-form__dropdown-icon fa-solid fa-chevron-up"></span>}
                        <ul className="task-config-form__dropdown-content" style={{ display: periodDropdownDisplay }}>
                            <li>Every day</li>
                            <li>Every week</li>
                            <li>Every month</li>
                            <li>Every year</li>
                            <li>Select week days</li>
                            <li>Every X days</li>
                            <li>X times per Y</li>
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