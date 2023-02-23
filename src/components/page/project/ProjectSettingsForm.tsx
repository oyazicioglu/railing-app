import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { ProjectType } from './ProjectType'
import ProjectTabContext from './ProjectTabContext'

interface Props {
    project: ProjectType
}

export const ProjectSettingsForm = (props: Props) => {
    const [project, setProject] = useState<ProjectType>(undefined);
    const form = useRef();
    const [projectName, setProjectName] = useState(props.project?.name);
    const context = useContext(ProjectTabContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setProjectName(name);
        context.changeProjectName(project.id, name)
    }

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    useEffect(() => {
        setProject(props.project)
        setProjectName(props.project?.name)
    }, [props.project]);

    return (
        <section className='mini-section'>
            {project &&
                <Form ref={form} onSubmit={handleForm}>
                    <Stack gap={1}>
                        <h5>Proje Ayarları</h5>
                        <Form.Control size="sm" type="text" value={projectName} id="form-name" onChange={handleChange} placeholder="Ad" />
                    </Stack>
                </Form>
            }
        </section>
    )
}
