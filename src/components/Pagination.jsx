import "./Pagination.css";

const Pagination = (props) => {
    // props.count holds the number of circles. props.current holds the current page
    let circles = [];
    console.log("Props.current is below");
    console.log(props.current);
    for (let i = 1; i <= props.count; i++) {
        // this starts from page 1 to props.count
        let circle = <div className={`circle ${props.current === i ? "active" : ""}`}>
            {props.current === i ? <span className="fa-solid fa-circle-dot"></span> : <span className="fa-regular fa-circle"></span>}
        </ div>;

        circles.push(circle);
    }
    return (
        <div className="pagination-container">
            <div className="pagination-progress-container">
                <div className="pagination-progress-bar"></div>
            </div>
            {circles}
        </div>
    )
}

export default Pagination;