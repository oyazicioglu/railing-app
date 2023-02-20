import React from 'react'
import PropTypes from 'prop-types'
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject'

interface Props extends PropsBase {
    project: IProject
}

const Project = (props: Props) => {
    return (
        <div>
            {JSON.stringify(props.project)}
        </div>
    )
}


export default Project