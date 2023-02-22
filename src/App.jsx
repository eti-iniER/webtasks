import TaskItem from "./components/TaskItem";
import TaskGrid from "./components/UI/TaskGrid";

function App() {
  const firstTask = {
    name: "Math",
    description: "Build • 3h • Every day",
    type: "Counter",
    theme: "",
    goal: 10,
  }

  const secondTask = {
    name: "Code",
    description: "Build • 2h • Every day",
    type: "Timer",
    theme: "",
    goal: 60,
  }

  const thirdTask = {
    name: "Brush teeth",
    description: "Every day",
    type: "Checkbox",
    theme: "",
    goal: true,
  }

  return (
    <div className="App">
      <TaskGrid>
        <TaskItem data={firstTask} />
        <TaskItem data={secondTask} />
        <TaskItem data={thirdTask} />
      </TaskGrid>
    </div>
  )
}

export default App
