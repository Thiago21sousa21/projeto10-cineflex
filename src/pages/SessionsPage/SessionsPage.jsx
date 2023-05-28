import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage(props) {
    const { id, setCheckout, checkout } = props;
    let [daysFilme, setDaysFilme] = useState([]);
    let [nomeFilme, setNomeFilme] = useState([]);
    const [imgFilme, setImgFilme] = useState([]);

    //console.log('ID DE SESSIONS PAGE', id);
    //console.log( dataFilme);
    const parametros = useParams();
    //console.log(parametros, 'estes são os parametros da sessions')

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`);
        promise.then((answer) => {
            //console.log('RESPOSTA DAYS DO FILME POR ID (SESSIONN)', answer.data);
            
            setNomeFilme(answer.data.title);
            setImgFilme  (answer.data.posterURL);
            setDaysFilme  (answer.data.days);

        });
        promise.catch(error => console.log(error));

    }, []);
    
    function pegaCheckout(data, hora){
        checkout.titulo =  nomeFilme;
        // console.log(data);
        // console.log(hora);
        checkout.data = data;
        checkout.hora = hora;
    }

    return (
        <PageContainer  >
            Selecione o horário
            <div>
                {daysFilme && daysFilme.map((day) => (
                    <SessionContainer data-test="movie-day" key ={day.id}>
                        {day.weekday} - {day.date}
                        <ButtonsContainer>
                            {day.showtimes.map((t)=>(<Link data-test="showtime" onClick={()=> pegaCheckout(day.date, t.name) }to={`/assentos/${t.id}`} key={t.id} ><button >{t.name}</button></Link>))}                     
                        </ButtonsContainer>
                    </SessionContainer>
                ))}
            </div>

            <FooterContainer>
                <div>
                    <img src={imgFilme} alt="poster" />
                </div>
                <div>
                    <p>{nomeFilme}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display:  flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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