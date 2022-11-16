import React from 'react'
import { styles } from '../theme/appTheme';
import { View, Text, TouchableOpacity } from 'react-native'

interface Props{
    texto: String;
    color?: String;
    ancho?:boolean;
    accion: (numeroTexto:String)=>void;
}

export const BotonCalc = ({texto,color="#2D2D2D",ancho=false, accion}: Props) => {
  return (
    <TouchableOpacity
        onPress={()=>accion(texto)}
    >
    <View style={{
        ...styles.boton,
        backgroundColor: color,
        width: (ancho)? 180 : 80
        }}>
        <Text style={{
            ...styles.botonTexto,
            color: (color === '#9b9b9b')? 'black': 'white'
            }}>{texto}</Text>
    </View>
    </TouchableOpacity>
  )
}
