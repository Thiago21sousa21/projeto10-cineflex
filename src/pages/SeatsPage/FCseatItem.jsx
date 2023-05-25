import styled from "styled-components";
import { useState } from "react";

export default   function FCseatItem(props){
    const [selecionado, setSelecionado ]= useState(false);
    const {seat}=props;

    return(<SeatItem disponivel={seat.isAvailable} selecionado={selecionado} onClick={()=>setSelecionado(true)} >{seat.name}</SeatItem>);
}

const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: ${ props => props.disponivel === true && props.selecionado=== true ? '#1AAE9E' : props.disponivel === true ? '#C3CFD9' : '#FBE192'} ;   // Essa cor deve mudar
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