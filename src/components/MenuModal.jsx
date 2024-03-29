import "./MenuModal.css";

const MenuModal = (props) => {

    return (
        <div onClick={props.close} className="menu-background" style={{ display: props.isVisible ? "flex" : "none", width: props.width }}>
            <div className="menu-content">
                <button className="menu-close-button" onClick={props.close}>
                    <span className="fa-solid fa-close"></span>
                </button>
                {props.children}
            </div>
        </div>
    )
};

export default MenuModal;