import './Projects.css';
import { useEffect, useState } from 'react';
import { IProject } from '../../components/page/project/IProject';
import { Title } from '../../components/ui/title/Title';
import { channels } from '../../lib/electron/events/Electron.Channels';
import { Button } from '../../components/ui/button/Button';
import { Section } from '../../components/ui/section/Section';
import { Add, Edit, RadioButtonChecked, TrashCan } from '@carbon/icons-react';
import { Breadcrumb } from '../../components/ui/breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '../../components/ui/breadcrumb/BreadcrumbItem';
import { Modal } from '../../components/ui/modal/Modal';
import { NewProjectModal } from '../../components/page/project/NewProjectModal';
import { NavLink } from 'react-router-dom';
import { DeleteProjectModelContent } from '../../components/page/project/DeleteProjectModelContent';

export const Projects = () => {
    const { send, on } = window.eventBridge;
    const [projects, setProjects] = useState<IProject[]>([]);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [activeProjectId, setActiveProjectId] = useState(0);

    const toggleShowNewProjectModal = () => {
        setShowNewProjectModal(!showNewProjectModal);
    };

    const getProjects = () => {
        send(channels.project.list);
    };

    on(channels.project.list, (data: IProject[]) => {
        setProjects(data);
    });

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects">
            {showNewProjectModal && (
                <Modal autoClose onClose={toggleShowNewProjectModal}>
                    <NewProjectModal
                        onClose={() => {
                            toggleShowNewProjectModal();
                            getProjects();
                        }}
                    ></NewProjectModal>
                </Modal>
            )}

            {showDeleteProjectModal && (
                <Modal
                    autoClose
                    onClose={() => {
                        setActiveProjectId(0);
                        setShowDeleteProjectModal(false);
                    }}
                >
                    <DeleteProjectModelContent
                        onClose={(update: boolean) => {
                            setActiveProjectId(0);
                            setShowDeleteProjectModal(false);
                            getProjects();
                        }}
                        projectId={activeProjectId}
                    ></DeleteProjectModelContent>
                </Modal>
            )}

            <Title title="Projeler"></Title>
            <div className="projects-header">
                <Breadcrumb>
                    <BreadcrumbItem href="/">Özet</BreadcrumbItem>
                    <BreadcrumbItem href="/projects">Projejer</BreadcrumbItem>
                </Breadcrumb>
                <Button
                    size="large"
                    onClick={toggleShowNewProjectModal}
                    isCircle
                    kind="primary"
                    hasShadow={true}
                >
                    <Add size={32}></Add>
                </Button>
            </div>
            <Section>
                <table width={'100%'}>
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}>#</th>
                            <th>Proje Adı</th>
                            <th style={{ width: '40px' }}>Aktif</th>
                            <th style={{ width: '100px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project, index) => {
                            return (
                                <tr key={project.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <NavLink to={`/projects/edit/${project.id}`}>
                                            {project.name}
                                        </NavLink>
                                    </td>
                                    <td>
                                        {project.active ? (
                                            <RadioButtonChecked color="green"></RadioButtonChecked>
                                        ) : (
                                            <RadioButtonChecked color="grey"></RadioButtonChecked>
                                        )}
                                    </td>
                                    <td style={{ verticalAlign: 'baseline' }}>
                                        <span className="action-buttons">
                                            <Button size="small" isCircle isTransparent>
                                                <Edit></Edit>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setActiveProjectId(project.id);
                                                    setShowDeleteProjectModal(true);
                                                }}
                                                size="small"
                                                isCircle
                                                isTransparent
                                            >
                                                <TrashCan></TrashCan>
                                            </Button>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Section>
        </div>
    );
};
