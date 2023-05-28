import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FCseatItem from "./FCseatItem";


export default function SeatsPage(props) {
    const {arrReserva, setArrReserva, setCheckout, checkout }= props;
    const {idSessao} = useParams();
    const [dataSessao, setDataSessao] = useState(undefined);
    const navigate = useNavigate();



    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=>{
            setDataSessao(res.data);
        });
        promise.catch(erro=>console.log('DEU ERRO A PUXADA',erro));
    },[]);
    
    if(dataSessao === undefined){
        return(
        <>
        <div>Loaging...</div>
        <div>Loaging...</div>
        <div>Loaging...</div>
        <div>Loaging...</div>
        <div>Loaging...</div>
        <div>Loaging...</div>

        </>);
    }
    const {day, id, movie , name , seats} = dataSessao;

    function submeterReserva(event){
        event.preventDefault();
            
            let cpf = arrReserva.cpf.replace(/\D/g, '');
            if(arrReserva.ids.length === 0){ return alert('faltou as cadeiras!')}
            if (cpf.length !== 11 ) {
              return alert('cpf invalido');
            }
            if (cpf.length > 3) {
              cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
            }
            if (cpf.length > 7) {
              cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
            }
            if (cpf.length > 11) {
              cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
            }
            const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', arrReserva);
            promise.then( ans => {
                //console.log('O POST DEU CERTO', ans);
            });
            promise.catch(erro => console.log('O POST DEU ERRO', erro));
            const newArrReserva = {...arrReserva};
            setArrReserva(newArrReserva);
            navigate("/sucesso");
            

    }

    return (
        <PageContainer  >
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((seat)=> (<FCseatItem  
                                        arrReserva={arrReserva} setArrReserva={setArrReserva}
                                        key={seat.id} 
                                        seat={seat} 
                                        id={seat.id}
                                        setCheckout={setCheckout}  checkout={checkout}
                                    /> ))}                
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle className="verde" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="cinza" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="amarelo" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={submeterReserva}>
                <label htmlFor = 'nome'>Nome do Comprador:</label>
                <input data-test="client-name" id='nome' onChange={(e)=>{setArrReserva({ids:[...arrReserva.ids], nome:e.target.value, cpf:arrReserva.cpf})}} placeholder="Digite seu nome..." required/>

                <label htmlFor = 'cpf' >CPF do Comprador:</label>
                <input data-test="client-cpf" id='cpf' onChange={(e)=>{setArrReserva({ids:[...arrReserva.ids], nome:arrReserva.nome, cpf:e.target.value})}}  placeholder="Digite seu CPF..." required/>

                <button data-test="book-seat-btn" >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display:  flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;

`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
    .verde{
        background: #1AAE9E;
    }
    .cinza{
        background: #C3CFD9;
    }
    .amarelo{
        background: #FBE192;
    }
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`