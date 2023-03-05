import { useEffect, useRef, useState } from "react";
import { createPopup } from "@picmo/popup-picker";
import { TwemojiRenderer } from "@picmo/renderer-twemoji";
import WeekdaySelector from "./WeekdaySelector";

import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {

    const arrayEquals = (a1, a2) => {
        if (a1 == undefined || a2 == undefined) {
            return false;
        }
        console.log("array equals is running");
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }

    const emptyTask = {
        buildOrQuit: "Build",
        name: "",
        description: "",
        type: "",
        emoji: "⭐️",
        theme: "blue",
        start: "",
        goal: "0",
        weekdays: {},
        frequency: "",
        seconds: "",
        minutes: "",
        hours: "",
        occurence: 2,
    };

    let defaultTask = { ...emptyTask, ...props.previousChoices };
    if (props.thisIsAnEdit === true) {
        defaultTask = { ...defaultTask, ...props.preconfigs };
    };

    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59", "#962a96", "#232628"];
    const colorThemes = ["blue", "red", "orange", "green", "purple", "black"];
    // blue, red, orange, green, purple
    const [currentColor, setCurrentColor] = useState(colorThemes.indexOf(defaultTask.theme));
    const [periodDropdownDisplay, setPeriodDropdownDisplay] = useState("none");
    const [seconds, setSeconds] = useState(defaultTask.seconds);
    const [minutes, setMinutes] = useState(defaultTask.minutes);
    const [hours, setHours] = useState(defaultTask.hours);
    const [taskName, setTaskName] = useState(defaultTask.name);
    const [taskGoal, setTaskGoal] = useState(defaultTask.goal);
    const [taskTheme, setTaskTheme] = useState(defaultTask.theme);
    const [taskType, setTaskType] = useState(defaultTask.type);
    const [taskEmoji, setTaskEmoji] = useState(defaultTask.emoji);
    const [taskFrequency, setTaskFrequency] = useState(defaultTask.frequency);
    const [taskWeekdays, setTaskWeekdays] = useState(defaultTask.weekdays);
    const [taskOccurence, setTaskOccurence] = useState(defaultTask.occurence);

    const emojiContainer = useRef();

    let picmoEmojiPicker = null;

    useEffect(() => {
        picmoEmojiPicker = createPopup(
            {
                renderer: new TwemojiRenderer(),
                visibleRows: 4,
            },
            {
                referenceElement: emojiContainer.current || document.querySelector("App"),
                triggerElement: emojiContainer.current,
                onPositionLost: "close",
            }
        );

        picmoEmojiPicker.addEventListener("emoji:select", (EmojiSelection) => saveEmoji(EmojiSelection));
    });

    const saveEmoji = (EmojiSelection) => {
        setTaskEmoji(EmojiSelection.emoji);
    };

    const cycleColor = () => {
        setTaskTheme(colorThemes[(currentColor + 1) % colorThemes.length]);
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
        let freq = taskFrequency;
        if (taskFrequency === "Select week days") {
            // there are weekdays to save;
            freq = "";
            freq = taskWeekdays.selected.filter((x) => x != "").join(" ");

            if (freq.length === 15) {
                // the user selected every single day
                freq = "Every day";
            }
        } else if (taskFrequency === "Every X days") {
            freq = "Every " + taskOccurence + " days";
        }

        if (taskType === "Timer") {
            return defaultTask.buildOrQuit + " • " + makeShortTime() + " • " + freq;
        } else if (taskType === "Counter") {
            return defaultTask.buildOrQuit + " • " + taskGoal + " • " + freq;
        } else if (taskType === "Checkbox") {
            return defaultTask.buildOrQuit + " • " + freq;
        }

    }

    const saveTask = () => {
        let genericGoal = taskGoal;
        if (taskType === "Timer") {
            genericGoal = Number(hours * 3600) + Number(minutes * 60) + Number(seconds)
            setTaskGoal(String(genericGoal));
        };

        let task = {
            name: taskName,
            description: makeDescription(),
            theme: taskTheme,
            goal: genericGoal,
            type: taskType,
            emoji: taskEmoji,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            frequency: taskFrequency,
            weekdays: taskWeekdays,
            occurence: taskOccurence,
        }
        if (arrayEquals(taskWeekdays.selected, ["S", "M", "T", "W", "Th", "F", "Sa"])) {
            task.frequency = "Every day"
            task.weekdays = {}
        }

        props.createTask(task);
        props.closeSidebar();

    }

    const changeFrequency = (choice) => {
        if (choice === "Select week days") {
            ;
        } else {
            setTaskWeekdays({})
        }
        setTaskFrequency(choice);
    }

    const openEmojiPicker = () => {
        picmoEmojiPicker.open();
    }

    const handleOccurenceInput = (event) => {
        setTaskOccurence(event.target.value);
    }
    const saveTaskEdits = () => {
        let genericGoal = taskGoal
        if (taskType === "Timer") {
            genericGoal = Number(hours * 3600) + Number(minutes * 60) + Number(seconds)
            setTaskGoal(String(genericGoal));
        };

        let task = {
            name: taskName,
            description: makeDescription(),
            theme: taskTheme,
            goal: genericGoal,
            type: taskType,
            emoji: taskEmoji,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            frequency: taskFrequency,
            weekdays: taskWeekdays,
            occurence: taskOccurence,
        }


        if (arrayEquals(taskWeekdays.selected, ["S", "M", "T", "W", "Th", "F", "Sa"])) {
            console.log("Every day was chosen indirectly");
            task.frequency = "Every day"
            task.weekdays = {}
        }

        props.saveEdit(task);
        props.closeSidebar();
    }

    const saveSelectedDaysHandler = (selectedDays) => {
        setTaskWeekdays(selectedDays);
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
                    <input type="text" onChange={(event) => { handleNameInput(event) }} value={taskName}></input>
                </div>

                {defaultTask.type === "Timer" ?
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

                {defaultTask.type === "Counter" ?
                    <div className="task-config-form__field">
                        <label>AMOUNT PER PERIOD</label>
                        <input type="number" min="1" max="100" onChange={(event) => { handleAmountInput(event) }} value={taskGoal}></input>
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

                {taskFrequency === "Select week days" ? <WeekdaySelector saveSelectedDays={saveSelectedDaysHandler} loadWeekdays={defaultTask.weekdays} /> : ""}

                {taskFrequency === "Every X days" ?
                    <div className="task-config-form__field">
                        <label>FREQUENCY</label>
                        <input type="number" min={2} max={6} value={taskOccurence} onChange={(e) => handleOccurenceInput(e)}></input>
                    </div> : ""}

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


                {props.thisIsAnEdit ? <button className="task-config-form__submit" onClick={saveTaskEdits}>Save Edits</button> :
                    <button className="task-config-form__submit" onClick={saveTask}>Create Task</button>}

            </div>
        </div>
    )
}

export default TaskConfigPage;