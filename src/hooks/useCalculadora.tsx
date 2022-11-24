/* eslint-disable prettier/prettier */
import {useState, useRef} from 'react';
enum Operadores{
    suma, resta, multiplicar, dividir
  }

export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');
  
    const ultimaOperacion = useRef<Operadores>();
  
    const limpiar = ()=>{
      setNumero('0');
      setNumeroAnterior('0');
    };
  
    const armarNumero = (numeroTexto:String) =>{
      //No doble punto
      if(numero.includes('.')&& numeroTexto==='.') return;
  
      //NO CERO NEGATIVO
      if(numero.startsWith('0') || numero.startsWith('-0')){
      //Punto decimal
      if(numeroTexto === '.'){
        setNumero(numero+numeroTexto);
      } else if (numeroTexto==='0' && numero.includes('.')){
        //Evaluar si hay otro cero y punto
        setNumero(numero + numeroTexto);
      } else if(numeroTexto!=='0' && !numero.includes('.')){
        //Evaluar si es diferente de cero y no tiene punto
        setNumero(numeroTexto);
      }else if(numeroTexto === '0' && numero.includes('.')){
        //Evitar 0000.0
        setNumero(numero);
      }else{
        setNumero(numero+numeroTexto);
      }
      }else{
        setNumero(numero+numeroTexto);
      }  
    };
  
    const positivoNegativo = ()=>{
      if(numero.includes('-')){
        setNumero(numero.replace('-',''));
      }else if (numero.includes('0') && numero.length<2){
        setNumero(numero.replace('0','0'));
      }else{
        setNumero('-'+numero);
      }
    };
  
  
    const btnDel = ()=>{
      if(numero.length>1){
        setNumero(numero.slice(0, -1));
      }
      if(numero.length===1){
        setNumero('0');
      }
      if(numero.includes('-') && numero.length===2){
        setNumero('0');
      }
    };
  
    const cambiarNumeroPorAnterior = ()=>{
      if(numero.endsWith('.')){
        setNumeroAnterior(numero.slice(0, -1));
      } else{
        setNumeroAnterior(numero);
      }
      setNumero('0');
    };
  
    const btnDividir = ()=>{
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.dividir;
    };
  
    const btnMultiplicar = ()=>{
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.multiplicar;
    };
  
    const btnSumar = ()=>{
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.suma;
    };
  
    const btnRestar = ()=>{
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.resta;
    };
  
    
    const calcular = ()=>{
      const num1 = Number(numero);
      const num2 = Number(numeroAnterior);
      console.log(num1)
      
      
      switch (ultimaOperacion.current) {
        case Operadores.suma:
          setNumero(`${num1 + num2}`);
          break;
        case Operadores.resta:
          setNumero(`${num2 - num1}`);
          break;
        case Operadores.multiplicar:
          setNumero(`${num1 * num2}`);
          break;
        case Operadores.dividir:
          if(isNaN(num1)){
            setNumero('No existen valores anteriores');
          }
          else{
            if(num1===0){
              setNumero('No existe division para 0');
            }else{
              setNumero(`${num2 / num1}`);
            }
          }
          break;
          }
      setNumeroAnterior('0');
    };

    return{
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDel,
        btnDividir,
        btnMultiplicar,
        btnSumar,
        btnRestar,
        calcular
    }
}
