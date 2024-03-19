import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: ""
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
