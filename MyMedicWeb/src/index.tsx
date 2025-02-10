import ReactDOM from "react-dom/client";
import { AppRouter } from "./app/Routes/AppRouter";
import { RouterProvider } from "react-router-dom";
import "./app/Style/index.css";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={AppRouter} />);
