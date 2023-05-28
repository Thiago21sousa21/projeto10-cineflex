import styled from "styled-components";
import { useState } from "react";

export default function FCseatItem(props) {
    const [selecionado, setSelecionado] = useState(false);
    const { arrReserva, setArrReserva, seat, id, setCheckout, checkout } = props;

    function selecionarAssento(id, disponivel, lugar) {

        const newObj = {...arrReserva};

        if (disponivel == false) return;
        if (arrReserva.ids.length === 0 || !arrReserva.ids.includes(id) ) {
            setSelecionado(true);
            newObj.ids.push(id);
            setArrReserva(newObj);
           // console.log(arrReserva);
            checkout.cadeiras.push(lugar);
            //console.log(checkout.cadeiras);


            return;
        } else {
            setSelecionado(false);

            let newArray = [];
            arrReserva.ids.forEach((interno) => {
                if (interno !== id) {
                    newArray.push(interno);
                }
            });
            arrReserva.ids = newArray;
            //console.log(arrReserva);

            let newArray2 = [];
            checkout.cadeiras.forEach(element => {
                if( element !== lugar){
                    newArray2.push(element);
                }
            });
            checkout.cadeiras = newArray2;
            //console.log(checkout);
        }   

    }

    return (<SeatItem disponivel={seat.isAvailable} selecionado={selecionado} onClick={() => selecionarAssento(id, seat.isAvailable, seat.name)} >{seat.name}</SeatItem>)
}

const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: ${props => props.disponivel === true && props.selecionado === true ? '#1AAE9E' : props.disponivel === true ? '#C3CFD9' : '#FBE192'} ;   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`
