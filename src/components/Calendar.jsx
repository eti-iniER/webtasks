import { useState, useRef, useEffect } from "react";
import "./Calendar.css";
import CalendarDay from "./CalendarDay";

const Calendar = (props) => {
    const DAY = 86400000;
    const [showResetButton, setShowResetButton] = useState("none");
    const MAXDAYS = 50;            // Days on either side of the current day!
    let calendar = useRef();
    let days = [];
    let today = new Date();
    let leftScroll = null;
    let rightScroll = null;

    for (let i = -MAXDAYS; i <= MAXDAYS; i++) {
        let thisDate = new Date(today.getTime() + (DAY * i));
        let thisDay = <CalendarDay date={thisDate} key={i + 10} isToday={i === 0} />
        days.push(thisDay);
    }

    useEffect(() => {
        // Centers the calendar to the current day. Magic, actually
        calendar.current.scrollLeft = (calendar.current.scrollWidth / 2) - 400;
        console.log(calendar);
    }, []);

    const scrollLeft = () => {
        leftScroll = setInterval(() => {
            calendar.current.scrollLeft -= 2;
        }, 10)
        console.log(calendar.current.scrollLeft);
    };

    const scrollRight = () => {
        rightScroll = setInterval(() => {
            calendar.current.scrollLeft += 2;
        }, 10)
        console.log(calendar.current.scrollLeft);
    }
    const clearScrollLeft = () => {
        clearInterval(leftScroll);
    }
    const clearScrollRight = () => {
        clearInterval(rightScroll);
    }

    const centerCalendar = (event) => {
        console.log(event);
    }
    return (
        <div className="calendar-main-container">
            <button className="calendar-scroll calendar-scroll__left" onMouseEnter={scrollLeft} onMouseLeave={clearScrollLeft}><span className="fa-solid fa-chevron-left"></span></button>
            <button className="calendar-scroll calendar-scroll__right" onMouseEnter={scrollRight} onMouseLeave={clearScrollRight}><span className="fa-solid fa-chevron-right"></span></button>
            <div className="calendar-container">
                <div className="calendar" onFocus={(event) => { centerCalendar(event) }} ref={calendar} >
                    {days}
                </div>
            </div>
        </div >
    )
}

export default Calendar;