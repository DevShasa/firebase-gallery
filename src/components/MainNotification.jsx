/**
 * This will display if alert location === "main"
 */

import Notify from "./Notify";
import { useAuth } from "../context/authContext";

const MainNotification = ()=>{
    const {alert:location} = useAuth();
    return location === "main" && <Notify />
}

export default MainNotification