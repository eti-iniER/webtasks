import TaskItem from "./components/TaskItem";
import TaskGrid from "./components/UI/TaskGrid";

function App() {
  const firstTask = {
    name: "Math",
    description: "Build • 3h • Every day",
    type: "Counter",
  }

  const secondTask = {
    name: "Code",
    description: "Build • 2h • Every day",
    type: "Timer",
  }
  return (
    <div className="App">
      <TaskGrid>
        <TaskItem data={firstTask} />
        <TaskItem data={secondTask} />
      </TaskGrid>
    </div>
  )
}

export default App
