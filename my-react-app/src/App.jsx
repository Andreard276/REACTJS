import Encabezado from "./Encabezado";
function App(){
  
  
  return ( 
    <div> 
      <Encabezado />
    <h1>5A EVND</h1>
    <h2>Profesor:</h2>
    <h3>M.T.I Ricardo Luna Santos</h3>
    <h4>Andrea</h4>

  
    
    </div>
   
  ) 
}

function UserComponent(){
  
  const nombre = 'Andrea';
  const apellidos = 'Rodriguez Morales';
  const nombrecompleto = <h2>El nombre es: {nombre} y sus apellidos {apellidos}</h2>;
  return <h1>User Component {nombrecompleto}</h1>;
}

function ProfileComponent(){
  const users = [
    {id: 1, name: 'Andrea', role: 'Web Developer'},
    {id: 2, name: 'Diego', role: 'Web Designer'},
    {id: 3, name: 'Paola', role: 'Team Leader'},]
  return (
    <>
    <p>Lista de usuarios del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

function FeedComponent(){
  const users=[
    {id:1, name:'pala', role:'Materiales de construcción'},
    {id:2, name:'martillo', role:'Herramientas de construcción'},
    {id:3, name:'cemento', role:'Materiales de construcción'},
    {id:4, name:'ladrillo', role:'Materiales de construcción'},
    {id:5, name:'nivel', role:'Herramientas de construcción'},
  ]
   return (
    <>
    <p>Lista de materiales del sistema</p>
    <ul>
      {
      users.map (function(user,index) {
        return (
          <li key={index}>{user.name} es un {user.role}</li>
        )
      })
    }
    </ul>
    </>

  );
}

 
  


export default App
