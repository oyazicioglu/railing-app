import React from 'react'
import { Tab } from 'react-bootstrap'
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject';

interface Props extends PropsBase {
    key: string;
    title: string;
    project?: IProject
}
export const ProjectTab = (props: Props) => {
    return (
        <Tab title={props.title} eventKey={props.key}>
            {props.children}
        </Tab>
    )
}
