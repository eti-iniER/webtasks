import "./TagManager.css";
import MenuModal from "./MenuModal";
import TaskTag from "./TaskTag";
import { useState, useEffect } from "react";

const TagManager = (props) => {
    const [newTagName, setNewTagName] = useState("");
    const [tags, setTags] = useState(props.task.tags);

    let visibleTags = [];
    visibleTags = tags.map((tagName, index) => {
        return <TaskTag name={tagName} key={index} />
    });
    console.log("Visible tags is now:");
    console.log(visibleTags);

    const deleteTag = (tagID) => {
        props.deleteTag(tagID);
    };

    const saveNewTag = (e) => {
        e.preventDefault();
        let newTags = tags.slice();
        newTags.push(newTagName);
        setTags(newTags);
        props.saveTags(props.task.id, newTags);
    }

    const tagNameInputHandler = (event) => {
        setNewTagName(event.target.value);
    }

    const closeHandler = () => {
        props.close();
    }

    return (
        <MenuModal isVisible={true} width={props.width} close={closeHandler}>
            <div className="tag-manager">
                <h2 className="tag-manager-description">Editing tags for {props.task.name}</h2>
                <div className="current-tags">
                    {visibleTags}
                </div>
                <form className="tag-manager__tag-input-form">
                    <input type="text" placeholder="Enter tag name" className="tag-input-form__input" onChange={e => tagNameInputHandler(e)} value={newTagName}></input>
                    <button className="tag-input-save-button" onClick={e => saveNewTag(e)}>Save tag</button>
                </form>
            </div>
        </MenuModal>
    )
}

export default TagManager;