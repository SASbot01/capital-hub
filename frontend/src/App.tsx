import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const element = useRoutes(routes);

return (
  <div className="min-h-screen bg-[#f5f5f7] text-neutral-900">
    {element}
    <div className="p-20 text-4xl font-bold bg-white">Tailwind FUNCIONA</div>
  </div>
  
);
}


export default App;
