import SideBar from "./components/SideBar";
import TaskItem from "./components/TaskItem";
import TaskItemMenu from "./components/TaskItemMenu";
import TaskCreateButton from "./components/UI/TaskCreateButton";
import TaskGrid from "./components/UI/TaskGrid";
import Calendar from "./components/Calendar";

import { useState } from "react";

let tasks = [
  {
    name: "Math",
    description: "Build • 10 • Every day",
    type: "Counter",
    theme: "blue",
    goal: 10,
    emoji: "➗",
  },
];

function App() {
  const [menuState, setMenuState] = useState("none");
  const [sideBarDisplayState, setSideBarDisplayState] = useState("none");
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [visibleTasks, setvisibleTasks] = useState(tasks);

  const toggleMenu = () => {
    if (menuState === "flex") {
      setMenuState("none")
    }
    else {
      setMenuState("flex")
    }
  }

  const toggleSideBar = () => {
    if (sideBarDisplayState === "flex") {
      setSideBarDisplayState("none");
    }
    else {
      setSideBarDisplayState("flex");
    }
  };

  const showMenu = (taskData) => {
    setCurrentTask(taskData);
    toggleMenu()
  };

  const saveTaskHandler = (taskData) => {
    console.log("Saving task");
    console.log(taskData);
    setvisibleTasks([...visibleTasks, taskData]);
  }

  console.log("Visible tasks are:");
  console.log(visibleTasks);
  let allTasks = [];


  for (let i = 0; i < visibleTasks.length; i++) {
    let thisTask = <TaskItem data={visibleTasks[i]} menu={showMenu} key={i} />;
    allTasks.push(thisTask);
  }

  return (
    <div className="App">
      <Calendar />
      <TaskGrid>
        {[allTasks]}
      </TaskGrid>

      <TaskCreateButton toggleCreateMenu={toggleSideBar} />
      <TaskItemMenu displayState={menuState} task={currentTask} close={toggleMenu} />
      <SideBar displayState={sideBarDisplayState} close={toggleSideBar} createTask={saveTaskHandler} />
    </div>
  )
}

export default App
