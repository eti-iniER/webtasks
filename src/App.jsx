import CreateTask from "./components/CreateTask";
import TaskItem from "./components/TaskItem";
import TaskItemMenu from "./components/TaskItemMenu";
import TaskCreateButton from "./components/UI/TaskCreateButton";
import TaskGrid from "./components/UI/TaskGrid";
import Calendar from "./components/Calendar";

import { useState } from "react";


const firstTask = {
  name: "Math",
  description: "Build • 3h • Every day",
  type: "Counter",
  theme: "orange",
  goal: 10,
  emoji: "➗",
}

const secondTask = {
  name: "Code",
  description: "Build • 2h • Every day",
  type: "Timer",
  theme: "red",
  goal: 30,
  emoji: "💻",
}

const thirdTask = {
  name: "Dance",
  description: "Every day",
  type: "Checkbox",
  theme: "green",
  goal: true,
  emoji: "🕺"
}

function App() {
  const [menuState, setMenuState] = useState("none");
  const [createMenuDisplayState, setCreateMenuDisplayState] = useState("none");
  const [currentTask, setCurrentTask] = useState(firstTask);

  const toggleMenu = () => {
    if (menuState === "flex") {
      setMenuState("none")
    }
    else {
      setMenuState("flex")
    }
  }

  const toggleCreateMenu = () => {
    if (createMenuDisplayState === "flex") {
      setCreateMenuDisplayState("none")
    }
    else {
      setCreateMenuDisplayState("flex")
    }
  }

  const showMenu = (taskData) => {
    setCurrentTask(taskData);
    toggleMenu()
  }
  return (
    <div className="App">
      <Calendar />
      <TaskGrid>
        <TaskItem data={firstTask} menu={showMenu} />
        <TaskItem data={secondTask} menu={showMenu} />
        <TaskItem data={thirdTask} menu={showMenu} />
      </TaskGrid>
      <TaskCreateButton toggleCreateMenu={toggleCreateMenu} />
      <TaskItemMenu displayState={menuState} task={currentTask} close={toggleMenu} />
      <CreateTask displayState={createMenuDisplayState} close={toggleCreateMenu} />
    </div>
  )
}

export default App
