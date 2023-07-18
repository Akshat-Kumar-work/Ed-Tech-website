// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  //agar state m token present nahi hai toh mtlb login nahi hai , return hojao login or signup page par par jo children hai uske
  if (token === null) {
    
    return children
  } 
  //agar token state m token present hai , jo login api call krke response se mila hai usko dala hoga token state  m toh mtlb call successfull hogyi and user logged in hai phle se 
  //toh login or signup page mt dikhao seedha dashborad vala my profile ka page dikhao
  else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute