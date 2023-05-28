import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useEffect, useState } from "react"
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'seuTokenDeAcessoNoHUB';
    const [DATA , setDATA ] = useState([]);
    const [id, setId]=useState(1);
    const [arrReserva, setArrReserva]=useState({ids:[],name:'',cpf:''})
    let [checkout, setCheckout ] = useState({ cadeiras:[], titulo:'', data:'', hora:''});

    useEffect(()=>{
        const promise = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
        promise.then( resposta => {
            //console.log('DADOS API DO COMPONENTE APP' ,resposta.data);
            setDATA(resposta.data)
        });
        promise.catch((erro)=>console.log(erro));
    
    },[]);

    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
           <Routes>
                < Route path='/' element={<HomePage 
                        DATA={DATA} 
                        setId={setId} 
                    />}
                />
                < Route path='/assentos/:idSessao' element={<SeatsPage 
                        arrReserva={arrReserva} setArrReserva={setArrReserva} 
                        DATA={DATA} 
                        setCheckout={setCheckout}  checkout={checkout}
                    />} 
                />
                < Route path = '/sessoes/:idFilme' element={<SessionsPage  
                        DATA={DATA} 
                        id={id}
                        setCheckout={setCheckout}  checkout={checkout}
                    />} 
                />
                < Route path='/sucesso' element={<SuccessPage 
                        arrReserva={arrReserva} setArrReserva={setArrReserva} 
                        DATA={DATA} 
                        setCheckout={setCheckout}  checkout={checkout}
                    />}
                 />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
