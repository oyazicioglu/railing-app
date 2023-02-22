import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { IProject } from './IProject'

interface Props {
    project: IProject
}

export const ProjectSettingsForm = (props: Props) => {
    const [project, setProject] = useState<IProject>(undefined);
    const form = useRef();
    const [projectName, setProjectName] = useState(props.project?.name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setProjectName(event.target.value) }

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
                        <h3>Proje Ayarları</h3>
                        <Form.Control size="sm" type="text" value={project.name} id="form-name" onChange={handleChange} placeholder="Ad" />
                        <Button variant='outline-secondary' type='submit' size='sm'> Kaydet </Button>
                    </Stack>
                </Form>
            }
        </section>
    )
}
