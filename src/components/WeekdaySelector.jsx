import "./WeekdaySelector.css";
import { useState } from "react";

const WeekdaySelector = (props) => {
    const emptyDays = {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        selected: ["", "", "", "", "", "", ""],
    }

    const [selectedDays, setSelectedDays] = useState(emptyDays);

    const selectWeekday = (day, index) => {
        // Basically write the selected days as an object, and keep track of the letters
        let newSelectedDays = { ...selectedDays };
        newSelectedDays[day] = !newSelectedDays[day];

        // here I took advantage of some weird JavaScript syntax...
        if (newSelectedDays[day] === true) {
            newSelectedDays.selected[index] = day[0].toUpperCase();
        } else {
            newSelectedDays.selected[index] = "";
        }

        setSelectedDays(newSelectedDays);
        props.saveSelectedDays(newSelectedDays);
    }

    return (
        <div className="weekday-selector">
            <button className={"weekday-selector__day" + `${selectedDays.sun ? " selected" : ""}`} onClick={() => { selectWeekday("sun", 0) }}>S</button>
            <button className={"weekday-selector__day" + `${selectedDays.mon ? " selected" : ""}`} onClick={() => { selectWeekday("mon", 1) }}>M</button>
            <button className={"weekday-selector__day" + `${selectedDays.tue ? " selected" : ""}`} onClick={() => { selectWeekday("tue", 2) }}>T</button>
            <button className={"weekday-selector__day" + `${selectedDays.wed ? " selected" : ""}`} onClick={() => { selectWeekday("wed", 3) }}>W</button>
            <button className={"weekday-selector__day" + `${selectedDays.thu ? " selected" : ""}`} onClick={() => { selectWeekday("thu", 4) }}>T</button>
            <button className={"weekday-selector__day" + `${selectedDays.fri ? " selected" : ""}`} onClick={() => { selectWeekday("fri", 5) }}>F</button>
            <button className={"weekday-selector__day" + `${selectedDays.sat ? " selected" : ""}`} onClick={() => { selectWeekday("sat", 6) }}>S</button>
        </div>
    )

}

export default WeekdaySelector;