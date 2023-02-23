import TaskItem from "./components/TaskItem";
import TaskItemMenu from "./components/TaskItemMenu";
import TaskCreateButton from "./components/UI/TaskCreateButton";
import TaskGrid from "./components/UI/TaskGrid";
import { useState } from "react";


const firstTask = {
  name: "Math",
  description: "Build • 3h • Every day",
  type: "Counter",
  theme: "orange",
  goal: 5,
  emoji: "➗",
}

const secondTask = {
  name: "Code",
  description: "Build • 2h • Every day",
  type: "Timer",
  theme: "",
  goal: 30,
  emoji: "💻",
}

const thirdTask = {
  name: "Dance",
  description: "Every day",
  type: "Checkbox",
  theme: "",
  goal: true,
  emoji: "🕺"
}

function App() {
  const [menuState, setMenuState] = useState("none");
  const [currentTask, setCurrentTask] = useState(firstTask);

  const toggleMenu = () => {
    if (menuState === "flex") {
      setMenuState("none")
    }
    else {
      setMenuState("flex")
    }
  }

  const showMenu = (taskData) => {
    setCurrentTask(taskData);
    toggleMenu()
  }
  return (
    <div className="App">
      <TaskGrid>
        <TaskItem data={firstTask} menu={showMenu} />
        <TaskItem data={secondTask} menu={showMenu} />
        <TaskItem data={thirdTask} menu={showMenu} />
      </TaskGrid>
      <TaskCreateButton />
      <TaskItemMenu displayState={menuState} task={currentTask} close={toggleMenu} />
    </div>
  )
}

export default App
