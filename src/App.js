import "./App.css";
import "tailwindcss/tailwind.css";
import SideBar from "./Components/SideBar/SideBar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

function App() {
  return (
    <div className="app flex max-w-screen-2xl mx-auto h-screen w-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />
    </div>
  );
}

export default App;
