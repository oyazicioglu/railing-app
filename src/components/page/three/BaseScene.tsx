import { Canvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const BaseScene = () => {

    const CameraController = (): JSX.Element => {
        const { camera, gl } = useThree();
        useEffect(() => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 0.1;
            controls.maxDistance = 2000;
            return () => {
                controls.dispose();
            };
        }, [camera, gl]);
        return null;
    };

    return (
        <Canvas gl={{ antialias: true }} camera={{ position: [0, 5, 5] }} shadows={'soft'}>
            <CameraController />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={2} castShadow color="white" position={[2, 2, 1]} />
            <mesh castShadow receiveShadow rotation={[(Math.PI / 2) * -1, 0, 0]}>
                <planeGeometry args={[20, 20]}></planeGeometry>
                <meshPhysicalMaterial color={0xFFFFFF} reflectivity={0}></meshPhysicalMaterial>
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
                <boxGeometry />
                <meshPhysicalMaterial color={0xFFFFFF} reflectivity={0} ></meshPhysicalMaterial>
            </mesh>
            <gridHelper args={[20, 20, 0x111111, 0x888888]} />
            <axesHelper></axesHelper>
        </Canvas>
    )
}
