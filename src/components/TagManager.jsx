import "./TagManager.css";
import MenuModal from "./MenuModal";
import TaskTag from "./TaskTag";

const TagManager = (props) => {
    const deleteTag = (tagID) => {
        props.deleteTag(tagID);
    };

    let tags = [];
    for (let i = 0; i < props.task.tags.length; i++) {
        tags.push(<TaskTag name={t} onDelete={deleteTag} id={i} />);
    }
    return (
        <MenuModal>
            <div className="tag-manager">
                <div className="current-tags">
                    {tags}
                </div>
                <form className="tag-manager__tag-input_form">
                    <input type="text" placeholder="Enter tag name"></input>
                    <button>Save tag</button>
                </form>
            </div>
        </MenuModal>
    )
}

export default TagManager;