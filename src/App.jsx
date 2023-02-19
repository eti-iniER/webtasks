import TaskItem from "./components/TaskItem";

function App() {
  const firstTask = {
    name: "Math",
    description: "Build • 3h • Every day",
  }
  return (
    <div className="App">
      <TaskItem data={firstTask} />
    </div>
  )
}

export default App
