import { useState } from "react";

const Git = () =>{
    const [search, setSearch] = useState("");
    const [search2, setSearch2] = useState("");

    const [user,setUser] = useState({
        name:"",
        img:"",
        moves:"",
        defensa:"",
        attack:"",
        type:""
    });

    const [user2,setUser2] = useState({
        moves_description:""
    });

    const fetchUser = async()=>{
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            const data = await response.json();

            setUser({
                name:data.name,
                img:data.sprites.other.home.front_default,
                moves:data.moves[1].move.name,
                defensa:data.stats[2].base_stat
            })

            const response2 = await fetch(`https://pokeapi.co/api/v2/move/${search2}`)
            const data2 = await response.json();

            setUser2({
                moves_description:data2.effect_entries.effect
            })

        }catch(error){
            console.log("error",error.message)
        }
    };

    return(
        <>  
          <div className="container">
            <h1>Buscador de Pokemon</h1>
            <div className="grid">
                <input onChange={(e)=>setSearch(e.target.value) } type="text" placeholder="Ingresa el pokemon"/>
            </div>
            <div>
                <button onClick={fetchUser}>Buscar</button>
            </div>
            <article className="text-center">
                <div align="center">
                    <img src={user.img} alt="avatar"/>
                    <h4 className="text-center">{user.name}</h4>
                    <p className="text-center">{user.moves}</p>
                    <p align="center">{user.defensa}</p>
                </div>
            </article>
          </div>

        </>

    );
}
export default Git