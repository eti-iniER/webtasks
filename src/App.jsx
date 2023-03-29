import SideBar from "./components/SideBar";
import TaskItem from "./components/TaskItem";
import TaskItemMenu from "./components/TaskItemMenu";
import TaskCreateButton from "./components/UI/TaskCreateButton";
import TaskGrid from "./components/UI/TaskGrid";
import Calendar from "./components/Calendar";
import TagManager from "./components/TagManager";

import { useEffect, useState } from "react";
import TaskDataPage from "./components/TaskDataPage";


function App() {
  const [menuState, setMenuState] = useState("none");
  const [sideBarDisplayState, setSideBarDisplayState] = useState("none");
  const [currentTask, setCurrentTask] = useState(null);
  const [visibleTasks, setvisibleTasks] = useState([]);
  const [sideBarAnimation, setSideBarAnimation] = useState("slide-in");
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  const [taskToBeEdited, setTaskToBeEdited] = useState(null);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [isViewingData, setIsViewingData] = useState(false);
  const [menuWidth, setMenuWidth] = useState("100vw");

  const toggleMenu = () => {
    if (menuState === "flex") {
      setMenuState("none");
    }
    else {
      setMenuState("flex");
    }
  }

  useEffect(() => {
    if (sideBarDisplayState === "flex") {
      // the sidebar is open
      setMenuWidth("65vw");
    } else {
      setMenuWidth("100vw");
    }
  }, [sideBarDisplayState])
  const openSideBar = () => {
    setSideBarAnimation("slide-in");
    setSideBarDisplayState("flex");
  };

  const toggleSideBar = () => {
    if (sideBarDisplayState === "flex") {
      // hide the taskbar
      setIsTaskEdit(false);
      setSideBarAnimation("slide-out");
      setTimeout(() => {
        setSideBarDisplayState("none");
      }, 150)
    }
    else {
      setSideBarAnimation("slide-in");
      setSideBarDisplayState("flex");
    }
  };

  const showMenu = (taskKey) => {
    setCurrentTask(visibleTasks[taskKey]);
    toggleMenu()
  };

  const saveTaskHandler = (taskData) => {
    let taskDataWithID = { ...taskData, id: visibleTasks.length };
    setvisibleTasks([...visibleTasks, taskDataWithID]);
  }

  const editTask = (taskID) => {
    setIsTaskEdit(true);
    setTaskToBeEdited(taskID);
    openSideBar();
  }

  const saveEditHandler = (editedTaskData) => {
    setIsTaskEdit(false);
    const tasksAfterEdit = visibleTasks.map(task => {
      if (task.id === editedTaskData.id) {
        return editedTaskData;
      } else {
        return task;
      }
    });
    setvisibleTasks(tasksAfterEdit);
  }
  let allTasks = [];

  const getTaskHandler = (taskID) => {
    return visibleTasks[taskID];
  }

  const editTagsHandler = (tagID) => {
    setIsEditingTags(true);
    setCurrentTask(visibleTasks[tagID]);
    console.log("We are editing tags");
  }

  const saveTagsHandler = (taskID, newTags) => {
    let thisTask = null;
    for (let task of visibleTasks) {
      if (task.id === taskID) {
        console.log("You are editing task");
        console.log(task);
        thisTask = { ...task, tags: newTags }
      }
    }
    console.log("This task is ");
    console.log(thisTask)
    saveEditHandler(thisTask);
    setCurrentTask(thisTask);
  };

  const deleteTaskHandler = (taskID) => {
    let newVisibleTasks = visibleTasks.filter((t) => {
      if (t.id === taskID) {
        return false;
      } else {
        return true;
      }
    });
    setvisibleTasks(newVisibleTasks);
  }

  const resetTaskHandler = (taskID) => {
    let emptyTask = {
      name: "",
      description: "",
      theme: "",
      goal: 0,
      type: "",
      emoji: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      frequency: 0,
      weekdays: {},
      occurence: 0,
      tags: [],
    }
    console.log("We are in resetTaskHandler from app.jsx")
    let newVisibleTasks = visibleTasks.map((t) => {
      if (t.id === taskID) {
        console.log("We are reseting this task")
        return {
          ...emptyTask, name: t.name, description: t.description,
          goal: t.goal, frequency: t.frequency, type: t.type, theme: t.theme, weekdays:
            t.weekdays
        }
      } else {
        return t;
      }
    });
    setvisibleTasks(newVisibleTasks);
  }
  const tagModalCloseHandler = () => {
    setIsEditingTags(false);
  }

  const viewDataHandler = (tagID) => {
    setCurrentTask(visibleTasks[tagID])
    setIsViewingData(true);
  }

  const statsCloseHandler = () => {
    setIsViewingData(false);
  }
  for (let i = 0; i < visibleTasks.length; i++) {
    let thisTask = <TaskItem data={visibleTasks[i]} menu={showMenu} key={i} id={i} />;
    allTasks.push(thisTask);
  }

  return (
    <div className="App">
      <Calendar />
      <TaskGrid sideBar={toggleSideBar}>
        {allTasks}
      </TaskGrid>

      {isViewingData ? <TaskDataPage visible={isViewingData} task={currentTask} close={statsCloseHandler}></TaskDataPage> : ""}
      <TaskCreateButton toggleCreateMenu={toggleSideBar} />
      {currentTask ? <TaskItemMenu visible={menuState} task={currentTask} close={toggleMenu} showEditMenu={editTask} sideBarState={sideBarDisplayState} deleteTask={deleteTaskHandler} editTags={editTagsHandler} viewData={viewDataHandler} resetTask={resetTaskHandler} /> : ""}
      {isEditingTags ? <TagManager task={currentTask} saveTags={saveTagsHandler} width={menuWidth} close={tagModalCloseHandler} /> : ""}
      <SideBar displayState={sideBarDisplayState} close={toggleSideBar} createTask={saveTaskHandler} animation={sideBarAnimation}
        getTask={getTaskHandler} isEdit={isTaskEdit} taskIndex={taskToBeEdited} saveEdit={saveEditHandler} />
    </div>
  )
}

export default App
