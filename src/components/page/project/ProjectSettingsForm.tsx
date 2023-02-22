import { useEffect, useRef, useState } from 'react'
import { IProject } from './IProject'

interface Props {
    project?: IProject
}

export const ProjectSettingsForm = (props: Props) => {
    const [project, setProject] = useState<IProject>()

    useEffect(() => {
    }, [props.project]);

    return (
        <></>
    )
}
