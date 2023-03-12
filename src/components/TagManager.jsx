import "./TagManager.css";
import MenuModal from "./MenuModal";
import TaskTag from "./TaskTag";
import { useState, useEffect } from "react";

const TagManager = (props) => {
    const [newTagName, setNewTagName] = useState("");
    const [tags, setTags] = useState(props.task.tags);

    const deleteTag = (tagID) => {
        props.deleteTag(tagID);
    };

    const saveNewTag = () => {
        newTags = tags.slice();
        newTags.push(newTagName);
        console.log(newTags);
        props.saveTags(props.task.id, newTags);
    }

    const tagNameInputHandler = (event) => {
        setNewTagName(event.target.value);
    }

    return (
        <MenuModal isVisible={true}>
            <div className="tag-manager">
                <h2 className="tag-manager-description">Editing tags for {props.task.name}</h2>
                <div className="current-tags">
                    {tags}
                </div>
                <form className="tag-manager__tag-input-form">
                    <input type="text" placeholder="Enter tag name" className="tag-input-form__input" onChange={e => tagNameInputHandler(e)} value={newTagName}></input>
                    <button className="tag-input-save-button" onClick={saveNewTag}>Save tag</button>
                </form>
            </div>
        </MenuModal>
    )
}

export default TagManager;