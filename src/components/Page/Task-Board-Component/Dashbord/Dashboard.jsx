import Navbar from '../../../component/Navbar'
import TaskBoard from '../components/TaskBoard/TaskBoard'
// import io from "socket.io-client"


// const socket = io.connect("")
export default function Dashboard() {
  return (
    <>
      <Navbar  /> 
    <div className=''>
      <TaskBoard  />

    </div>
    </>
  )
}
