import "./App.css";
import "tailwindcss/tailwind.css";
import SideBar from "./Components/SideBar/SideBar";
import Feed from "./Components/Feed/Feed";

function App() {
  return (
    <div className="App flex">
      {/* Sidebar */}
      <SideBar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
    </div>
  );
}

export default App;
