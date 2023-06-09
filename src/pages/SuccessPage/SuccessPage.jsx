import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function SuccessPage(props) {
    const {arrReserva, id, checkout, setCheckout, setArrReserva } = props;


    const cadeiras = checkout.cadeiras;


    return (
        <PageContainer >
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{checkout.titulo}</p>
                <p>{checkout.data} - {checkout.hora}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {cadeiras.map((num, index) =><p key ={index} >Assento {num}</p>)}
                {/* <p>Assento 01</p>
                <p>Assento 02</p>
                <p>Assento 03</p> */}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {arrReserva.name}</p>
                <p>CPF: {arrReserva.cpf}</p>
            </TextContainer>

            <Link to='/' data-test="go-home-btn" onClick ={()=>{setCheckout({ titulo:'', data:'', hora:'', cadeiras:[]});setArrReserva({ids:[], name:'',cpf:''})}}><button >Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`