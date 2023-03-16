import React from 'react'
import RainDrops from './Rain'
import SnowFlakes from './Snow';
import Flood from './Flood';
import Tornado from './Tornado';
import { TornadoModel } from '../../models/TornadoModel';


function HeavyRain(){
    const totalRainDrops = 1000;
    let rain = [];
    for(let i = 0; i < totalRainDrops; i++ ){
        rain.push(<RainDrops position={[Math.random()*10 - 5, Math.random()*10 + 5, Math.random()* 10 -5]}/>)
    }
    return rain;
}

function SnowStorm(){
    const totalSnowFlakes = 1000;
    //console.log("SNOWSTORM");
    let snow = [];
    for(let i = 0; i < totalSnowFlakes; i++ ){
        snow.push(<SnowFlakes position={[Math.random()*10 - 5, Math.random()*10 + 5, Math.random()* 10 -5]}/>)
    }
    return snow;

}

function ColdWaves(){
    
}

function Drought(){
    //console.log("DROUGHT");
    let drought = [];
    drought.push(
    <>
      <ambientLight intensity={1.25} color='#FFFF00' />
      <spotLight position={[0,0,0]} angle={0} penumbra={0} color='#FFFF00' />
      <pointLight position={[0, 0,0]} color='#FFFF00' />
    </>)
    return drought;
}

function Floods(){
    let wave = [];
    wave.push(<Flood/>)
    return wave;
}

function DustStorms(){

}

function Tornados(){
    console.log("Tornado");
    const totalTornados = 5;
    let tornados = [];

    for (let i = 0; i < totalTornados; i++ ){
        tornados.push(
            <>
            <Tornado position={[Math.random()*5, 0, Math.random()* 10 -5]}/>
            </>
        );
    }
    return tornados;
}

export const SeasonalEvents = {
    HeavyRain,
    SnowStorm,
    ColdWaves,
    Drought,
    Floods,
    DustStorms,
    Tornados
}

