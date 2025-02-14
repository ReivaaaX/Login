import { useEffect, useState, useRef} from "react";
import { Trash2 } from "lucide-react";
import "./style.css";
import api from "../../services/api"

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromDB = await api.get("/cadastro")

    setUsers(usersFromDB.data)
  }

  async function postUsers() {
    await api.post("/cadastro",{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })
    getUsers()
  }

  async function deleteUser(id) {
    await api.delete(`/cadastro/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro</h1>
        <input name="nome" type="text" placeholder="Nome" ref={inputName}/>
        <input name="idade" type="number" placeholder="Idade" ref={inputAge}/>
        <input name="email" type="text" placeholder="E-mail" ref={inputEmail}/>
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
              <div key={user.id} className="card">
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>E-mail: <span>{user.email}</span></p>
              </div>
              <button onClick={() => deleteUser(user.id)}>
                <Trash2></Trash2>
              </button>
            </div>
      ))}
    </div>
  );
}

export default Home;
