import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IProject } from '../../../components/page/project/IProject';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Project.css';

interface Props extends PropsBase {}

export const Project = () => {
    const { send, on } = window.eventBridge;

    const { id } = useParams();

    const getProject = (id: number) => {
        send(channels.project.get, { id });
    };

    on(channels.project.get, (data: IProject) => {
        console.log(data);
    });

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

    useEffect(() => {
        getProject(Number(id));
    }, []);
    return (
        <div className="project">
            <Canvas gl={{ antialias: true }} camera={{ position: [0, 5, 5] }} shadows={'soft'}>
                <CameraController />
                <ambientLight intensity={0.1} />
                <directionalLight castShadow color="white" position={[2, 2, 1]} />
                <mesh castShadow receiveShadow rotation={[(Math.PI / 2) * -1, 0, 0]}>
                    <planeGeometry args={[20, 20]}></planeGeometry>
                    <meshPhysicalMaterial color={'white'}></meshPhysicalMaterial>
                </mesh>
                <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
                <gridHelper args={[20, 20, 0x111111, 0x888888]} />
                <axesHelper></axesHelper>
            </Canvas>
        </div>
    );
};
