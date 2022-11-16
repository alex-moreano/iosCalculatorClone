import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';

export const CalculadoraScreen = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('100');

  const limpiar = ()=>{
    setNumero('0');
  }

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

  }

  const positivoNegativo = ()=>{
    if(numero.includes('-')){
      setNumero(numero.replace('-',''));
    }else{
      setNumero('-'+numero)
    }
  }
  return (
    <View style={styles.calculadoraContainer}>
        <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
        <Text 
          style={styles.resultado}
          numberOfLines={1}
          adjustsFontSizeToFit
        >{numero}</Text>

        <View style={styles.fila}>
            <BotonCalc texto="C" color="#9b9b9b" accion={limpiar}/>
            <BotonCalc texto="+/-" color="#9b9b9b" accion={positivoNegativo}/>
            <BotonCalc texto="del" color="#9b9b9b" accion={limpiar}/>
            <BotonCalc texto="/" color="#FF9427" accion={limpiar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto="7" accion={armarNumero}/>
            <BotonCalc texto="8" accion={armarNumero}/>
            <BotonCalc texto="9" accion={armarNumero}/>
            <BotonCalc texto="*" color="#FF9427" accion={limpiar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto="4" accion={armarNumero}/>
            <BotonCalc texto="5" accion={armarNumero}/>
            <BotonCalc texto="6" accion={armarNumero}/>
            <BotonCalc texto="-" color="#FF9427" accion={limpiar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto="1" accion={armarNumero}/>
            <BotonCalc texto="2" accion={armarNumero}/>
            <BotonCalc texto="3" accion={armarNumero}/>
            <BotonCalc texto="+" color="#FF9427" accion={limpiar}/>
        </View>
        <View style={styles.fila}>
            <BotonCalc texto="0" ancho accion={armarNumero}/>
            <BotonCalc texto="." accion={armarNumero}/>
            <BotonCalc texto="=" color="#FF9427" accion={limpiar}/>
        </View>
    </View>
  )
}
