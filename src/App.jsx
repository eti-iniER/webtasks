import SideBar from "./components/SideBar";
import TaskItem from "./components/TaskItem";
import TaskItemMenu from "./components/TaskItemMenu";
import TaskCreateButton from "./components/UI/TaskCreateButton";
import TaskGrid from "./components/UI/TaskGrid";
import Calendar from "./components/Calendar";

import { useState } from "react";


function App() {
  const [menuState, setMenuState] = useState("none");
  const [sideBarDisplayState, setSideBarDisplayState] = useState("none");
  const [currentTask, setCurrentTask] = useState(null);
  const [visibleTasks, setvisibleTasks] = useState([]);
  const [sideBarAnimation, setSideBarAnimation] = useState("slide-in");
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  const [taskToBeEdited, setTaskToBeEdited] = useState(null);

  const toggleMenu = () => {
    if (menuState === "flex") {
      setMenuState("none");
    }
    else {
      setMenuState("flex")
    }
  }

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

  const deleteTaskHandler = (taskID) => {
    let newVisibleTasks = visibleTasks.filter((t) => {
      if (t.id == taskID) {
        return false;
      } else {
        return true;
      }
    });
    setvisibleTasks(newVisibleTasks);
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

      <TaskCreateButton toggleCreateMenu={toggleSideBar} />
      {currentTask ? <TaskItemMenu visible={menuState} task={currentTask} close={toggleMenu} showEditMenu={editTask} sideBarState={sideBarDisplayState} deleteTask={deleteTaskHandler} /> : ""}
      <SideBar displayState={sideBarDisplayState} close={toggleSideBar} createTask={saveTaskHandler} animation={sideBarAnimation}
        getTask={getTaskHandler} isEdit={isTaskEdit} taskIndex={taskToBeEdited} saveEdit={saveEditHandler} />
    </div>
  )
}

export default App
