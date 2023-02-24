import "./CalendarDay.css";

const CalendarDay = (props) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let activeClass = "";

    if (props.isToday) {
        activeClass = "today";
    }
    return (
        <div className={"calendar-day" + " " + activeClass}>
            <span className="calendar-day__weekday">{days[props.date.getDay()]}</span>
            <span className="calendar-day__date">{props.date.getDate()}</span>
        </div>
    )
}

export default CalendarDay;