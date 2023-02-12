import React from 'react'
import RainDrops from './Rain'
import SnowFlakes from './Snow';


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
    console.log("SNOWSTORM");
    let snow = [];
    for(let i = 0; i < totalSnowFlakes; i++ ){
        snow.push(<SnowFlakes position={[Math.random()*10 - 5, Math.random()*10 + 5, Math.random()* 10 -5]}/>)
    }
    return snow;

}

function ColdWaves(){
    
}

function Drought(){

}

function Floods(){

}

function DustStorms(){

}

export const SeasonalEvents = {
    HeavyRain,
    SnowStorm,
    ColdWaves,
    Drought,
    Floods,
    DustStorms
}

