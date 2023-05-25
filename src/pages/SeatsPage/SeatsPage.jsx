import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FCseatItem from "./FCseatItem";

export default function SeatsPage(props) {
    const {idSessao} = useParams();
    console.log(idSessao, 'esse é o ID da sessao');
    const [dataSessao, setDataSessao] = useState(undefined);

    console.log(dataSessao,'sessão');

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=>{
            console.log('PUXADA OS ASSENTOS',res);
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

    return (
        <PageContainer  >
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((seat)=> (<FCseatItem key={seat.id} seat={seat} /> ))}                
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

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button  >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
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
const FormContainer = styled.div`
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