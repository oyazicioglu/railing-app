import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Edit from '@ant-design/icons/EditOutlined'
import { Button, Dropdown, Popconfirm, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject'
import ProjectContext from './ProjectContext';
import "./Project.css";
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import "./Projects.css";

const { Title } = Typography;

interface Props extends PropsBase {
    project?: IProject
}

interface ConvertedProject {
    key: number;
    id: number;
    index: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    systemName: string;
}


const Projects = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [projects, setProjects] = useState<ConvertedProject[] | undefined>([])
    const context = useContext(ProjectContext)

    const projeSil = (e: React.MouseEvent<HTMLElement>, projectId: number) => {
        send(channels.project.delete, { id: projectId })
    };

    const columns: ColumnsType<ConvertedProject> = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: '64px'
        },
        {
            title: 'Ad',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Button onClick={() => { context.open(record.id, record.name) }} type="link">{record.name}</Button>
            ),
        },
        {
            title: 'Sistem',
            dataIndex: 'systemName',
            key: 'systemName',
            width: '140px'
        },
        {
            title: 'Güncelleme Tarihi',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: '150px'
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '140px'
        },
        {
            title: '...',
            align: 'right',
            key: 'actions',
            width: '120px',
            render: (_, record) => (
                <Space direction='horizontal'>
                    <Button onClick={() => {
                        context.open(record.id, record.name)
                    }} type="dashed" shape="circle" icon={<Edit />} />
                    <Popconfirm
                        placement="topRight"
                        title="Proje Sil"
                        description="Projeyi silmek istediğinizden emin misiniz?"
                        onConfirm={(e: React.MouseEvent<HTMLElement>) => { projeSil(e, record.id) }}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button type="dashed" shape="circle" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const getProjects = () => {
        send(channels.project.list);
    }

    on(channels.project.list, (data: IProject[]) => {
        const convertedProject: ConvertedProject[] = data.map((project: IProject, index) => {
            return {
                id: project.id,
                key: project.id,
                index: index + 1,
                name: project.name,
                createdAt: new Date(project.createdAt).toLocaleDateString('tr', { dateStyle: 'medium' }),
                updatedAt: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('tr', { dateStyle: 'medium' }) : '-',
                systemName: project.system.name
            }
        })

        setProjects(convertedProject)
    })

    on(channels.project.delete, (data: IProject) => {
        if (data) {
            getProjects();
        }
    })

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects-page">
            <div className="page-header">
                <Title>Projeler</Title>
                <Button onClick={() => { context.open(undefined, 'Yeni Proje') }} type="primary" icon={<PlusOutlined />} shape='circle' size={'large'}>

                </Button>
            </div>
            <div className="projects-table">
                <Table dataSource={projects} columns={columns} pagination={{ pageSize: 10, hideOnSinglePage: true }} />;
            </div>
        </div>
    )
}


export default Projects