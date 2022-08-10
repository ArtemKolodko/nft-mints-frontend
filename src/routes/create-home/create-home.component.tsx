import { useNavigate } from "react-router-dom";

const CreateHome = () => {
  
  const navigate = useNavigate();

  

  return (
    <div>
      <button onClick={() => navigate('create-collectible')}>Create Collectible</button>
      <button onClick={() => navigate('create-access-pass')}>Create Access Pass</button>
    </div>
  )
  }

  export default CreateHome;