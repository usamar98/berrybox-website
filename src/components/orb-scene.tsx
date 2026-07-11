"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {Float,MeshDistortMaterial} from "@react-three/drei";
import {useRef} from "react";
import type {Mesh} from "three";
function Orb(){const mesh=useRef<Mesh>(null);useFrame((s,d)=>{if(mesh.current){mesh.current.rotation.x+=d*.12;mesh.current.rotation.y+=d*.18;mesh.current.position.x=Math.sin(s.clock.elapsedTime*.45)*.1}});return <Float speed={1.3} rotationIntensity={.45} floatIntensity={.55}><mesh ref={mesh} scale={1.7}><icosahedronGeometry args={[1,7]}/><MeshDistortMaterial color="#b31224" roughness={.16} metalness={.72} distort={.38} speed={1.4}/></mesh></Float>}
export function OrbScene(){return <Canvas camera={{position:[0,0,4.7],fov:42}} dpr={[1,1.5]}><ambientLight intensity={.9}/><directionalLight position={[4,4,3]} intensity={3}/><pointLight position={[-3,-2,2]} intensity={5} color="#ff3048"/><Orb/></Canvas>}


