import { useEffect,useState } from 'react';
import './App.css';
import { backendUrl} from '../config';


// eslint-disable-next-line react/prop-types
const UserDialog=({handleDialog, fetchUser})=>{


    const [formData, setUserData] = useState({
      name: '',
      imageUrl: '',
      dob: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      // You can handle the form submission logic here, such as sending the data to a server or performing some action with the user data.
      console.log(formData);
      

      await fetch(`${backendUrl}/users`,
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });

      await fetchUser();
      handleDialog();

    };
  return(
    <div className='dialog'>
    <div className="dialog-root">
      <form onSubmit={handleSubmit}>
        <h1>User Form</h1>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
    </div>
  )
}

 function App(){
  const [showDialog, setShowDialog]= useState(false);
   const[users, setUsers]=useState([]);

  const handleDialog=()=>{
    if(showDialog){
      setShowDialog(false);
    }else{
      setShowDialog(true);
    }
  }
  const fetchUser=async()=>{
    const responce=await fetch(`${backendUrl}/users`);
    const data=await responce.json();
    setUsers(data);
  }
  useEffect(()=>{
    fetchUser();
  },[])
  
  return(
    <div>
      <div style={{
        display:'flex',
        fontSize:32,
      }}>
        <div style={{
          flexGrow:1,
        }}>List of users in the app

        </div>
     <button onClick={handleDialog}>Add New User</button>
      </div>
      <div style={{
        display:'flex',
        flexWrap:'wrap',
      }}>

        {(users || []).map((user)=>(
          <div key={user.id}>
          <div style={{
            border:'1px solid',
            margin:4,
            padding:4
          }}>
            <img src={user.imageUrl} alt={user.name}/>
            <h3>{user.name}</h3>
            <h4>{user.dob}</h4>
            </div>
            </div>
        ))}
      </div>

      {showDialog && <UserDialog handleDialog={handleDialog} fetchUser={fetchUser}/>}
    </div>
  )
}


export default App;