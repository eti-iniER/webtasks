import "./Calendar.css";
import CalendarDay from "./CalendarDay";

const Calendar = (props) => {
    const DAY = 86400000;
    let days = [];
    let today = new Date();

    for (let i = -10; i < 11; i++) {
        let thisDate = new Date(today.getTime() + (DAY * i));
        let thisDay = <CalendarDay date={thisDate} key={i + 10} isToday={i === 0} />
        days.push(thisDay);
    }

    return (
        <div className="calendar-container">
            <div className="calendar">
                {days}
            </div>
        </div>
    )
}

export default Calendar;