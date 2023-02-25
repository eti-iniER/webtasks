import { useState, useRef, useEffect } from "react";
import "./Calendar.css";
import CalendarDay from "./CalendarDay";

const Calendar = (props) => {
    const DAY = 86400000;
    const [showResetButton, setShowResetButton] = useState("none");
    const MAXDAYS = 10;
    let calendar = useRef();
    let days = [];
    let today = new Date();
    let leftScroll = null;
    let rightScroll = null;

    for (let i = -MAXDAYS; i <= MAXDAYS + 1; i++) {
        let thisDate = new Date(today.getTime() + (DAY * i));
        let thisDay = <CalendarDay date={thisDate} key={i + 10} isToday={i === 0} />
        days.push(thisDay);
    }

    useEffect(() => {
        // Scrolls the calendar to the current day
        calendar.current.scrollLeft = 220 * Math.ceil(MAXDAYS / 10);
    }, []);

    const scrollLeft = () => {
        console.log("scrolling left");
        leftScroll = setInterval(() => {
            calendar.current.scrollLeft -= 2;
        }, 10)
        console.log(calendar.current.scrollLeft);
    };

    const scrollRight = () => {
        console.log("scrolling right");
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