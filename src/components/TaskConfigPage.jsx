import { useEffect, useRef, useState } from "react";
import { createPicker } from "picmo";
import { createPopup } from "@picmo/popup-picker";


import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {
    let defaultTask = {
        buildOrQuit: "",
        name: "",
        description: "Build • 3h • Every day",
        type: "Counter",
        emoji: "⭐️",
        theme: "blue",
        start: "",
        goal: 0,
        reminders: [],
        frequency: "Every day",
    };

    defaultTask = { ...defaultTask, ...props.previousChoices };

    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59", "#962a96"];
    const colorThemes = ["blue", "red", "orange", "green", "purple"];
    // blue, red, orange, green, purple
    const [currentColor, setCurrentColor] = useState(0);
    const [periodDropdownDisplay, setPeriodDropdownDisplay] = useState("none");
    const [seconds, setSeconds] = useState("");
    const [minutes, setMinutes] = useState("");
    const [hours, setHours] = useState("");
    const [taskName, setTaskName] = useState(defaultTask.name);
    const [taskDescription, setTaskDescription] = useState(defaultTask.description);
    const [taskGoal, setTaskGoal] = useState(defaultTask.goal);
    const [taskTheme, setTaskTheme] = useState(defaultTask.theme);
    const [taskType, setTaskType] = useState(defaultTask.type);
    const [taskEmoji, setTaskEmoji] = useState(defaultTask.emoji);
    const [taskFrequency, setTaskFrequency] = useState(defaultTask.frequency)

    const emojiContainer = useRef();
    let picmoEmojiPicker = null;

    useEffect(() => {
        picmoEmojiPicker = createPopup(
            {
                visibleRows: 4,
            },
            {
                referenceElement: emojiContainer.current || document.querySelector("App"),
                triggerElement: emojiContainer.current,
                onPositionLost: "close",
            }
        );

        picmoEmojiPicker.addEventListener("emoji:select", (EmojiSelection) => saveEmoji(EmojiSelection));
    })

    const saveEmoji = (EmojiSelection) => {
        setTaskEmoji(EmojiSelection.emoji);
    };

    useEffect(() => {
        setTaskGoal(Number(hours * 3600) + Number(minutes * 60) + Number(seconds));
    }, [hours, minutes, seconds])

    const cycleColor = () => {
        setTaskTheme(colorThemes[(currentColor + 1) % colors.length]);
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
        setTaskName(event.target.value);
    }

    const handleAmountInput = (event) => {
        setTaskGoal(event.target.value);
    }

    const handleSecondsInput = (event) => {
        setSeconds(event.target.value);
    }

    const handleMinutesInput = (event) => {
        setMinutes(event.target.value);
    }

    const handleHoursInput = (event) => {
        setHours(event.target.value);
    };

    const makeShortTime = () => {
        let h = Number(hours);
        let m = Number(minutes);
        let s = Number(seconds);

        let d = "";
        if (h > 0) {
            d += hours;
            d += "h"
        }
        if (m > 0) {
            d += minutes;
            d += "m"
        }
        if (s > 0) {
            d += seconds;
            d += "s"
        }
        return d;
    }
    const makeDescription = () => {
        let middle = "";
        if (taskType === "Timer") {
            return props.previousChoices.buildOrQuit + " • " + makeShortTime() + " • " + "Every day";
        } else if (taskType === "Counter") {
            return props.previousChoices.buildOrQuit + " • " + taskGoal + " • " + "Every day";
        } else {
            return props.previousChoices.buildOrQuit + " • " + "Every day";
        }
    }

    const saveTask = () => {
        let task = {
            name: taskName,
            description: makeDescription(),
            theme: taskTheme,
            goal: taskGoal,
            type: taskType,
            emoji: taskEmoji,
        }


        props.createTask(task);
        props.closeSidebar();

    }

    const changeFrequency = (choice) => {
        if (choice === "Select week days") {
            showWeekDaySelector();
        } else if (choice === "Every X days") {
            showAmountSelector();
        } else {
            ;
        }
        setTaskFrequency(choice);
    }

    const openEmojiPicker = () => {
        picmoEmojiPicker.open();
    }
    return (
        <div className="task-config-page">
            <div className="task-config-form">
                <div className="task-config-form__field">
                    <label>BUILD OR QUIT THIS HABIT?</label>
                    <input type="text" value={props.previousChoices.buildOrQuit} readOnly></input>
                </div>

                <div className="task-config-form__field">
                    <label>HABIT NAME</label>
                    <input type="text" onChange={(event) => { handleNameInput(event) }}></input>
                </div>

                {props.previousChoices.type === "Timer" ?
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
                    </div> : ""}

                {props.previousChoices.type === "Counter" ?
                    <div className="task-config-form__field">
                        <label>AMOUNT PER PERIOD</label>
                        <input type="number" min={1} onChange={(event) => { handleAmountInput(event) }} value={taskGoal}></input>
                    </div> : ""}

                <div className="task-config-form__field">
                    <label>PERIOD</label>
                    <div className="task-config-form__dropdown form-input" onClick={togglePeriodDropdown}>
                        {taskFrequency}
                        {periodDropdownDisplay === "none" ? <span className="task-config-form__dropdown-icon fa-solid fa-chevron-down"></span> :
                            <span className="task-config-form__dropdown-icon fa-solid fa-chevron-up"></span>}
                        <ul className="task-config-form__dropdown-content" style={{ display: periodDropdownDisplay }}>
                            <li onClick={(event) => { changeFrequency("Every day") }}>Every day</li>
                            <li onClick={(event) => { changeFrequency("Every week") }}>Every week</li>
                            <li onClick={(event) => { changeFrequency("Every month") }}>Every month</li>
                            <li onClick={(event) => { changeFrequency("Every year") }}>Every year</li>
                            <li onClick={(event) => { changeFrequency("Select week days") }}>Select week days</li>
                            <li onClick={(event) => { changeFrequency("Every X days") }}>Every X days</li>
                        </ul>
                    </div>
                </div>

                <div className="task-config-form__emoji-colour-container">
                    <div className="task-config-form__field emoji">
                        <label>EMOJI</label>
                        <div className="task-config-form__emoji-picker" onClick={openEmojiPicker} ref={emojiContainer}><span className="task-config-form__emoji-picker-emoji">{taskEmoji}</span></div>
                    </div>

                    <div className="task-config-form__field color">
                        <label>COLOR</label>
                        <div className="task-config-form__color-picker" style={{ borderColor: colors[currentColor], backgroundColor: colors[currentColor] }} onClick={cycleColor}><span className="fa-solid fa-palette"></span></div>
                    </div>

                </div>


                <button className="task-config-form__submit" onClick={saveTask}>Create Task</button>
            </div>
        </div>
    )
}

export default TaskConfigPage;