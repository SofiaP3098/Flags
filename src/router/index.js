import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "../Home"
import Git from "../PracticaGit"
import Flags from "../Flags"
import Detail from "../Detail"

//nuestro router va a ser un componente el cual se encargue de retornar las rutas de su respectvia vista 

const Router =()=>{

    return(
        <BrowserRouter>        
        <Routes>
            {/* publicas */}
            <Route path="/" element={<Home/>}/>
            <Route path="git" element={<Git/>} />
            <Route path="banderas" element={<Flags/>} />
            <Route path="/banderas/detail/:name" element={<Detail/>}/>
            {/* privadas */}


        </Routes>      
        
        
        </BrowserRouter>
    )

}



export default Router;