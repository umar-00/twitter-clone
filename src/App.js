import "./App.css";
import "tailwindcss/tailwind.css";
import SideBar from "./Components/SideBar/SideBar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

function App() {
  return (
    <div className="app flex flex-col mobile:flex-row justify-center max-w-screen-2xl mx-auto h-screen w-screen">
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
