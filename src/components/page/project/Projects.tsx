import { CheckOutlined, DeleteOutlined, DeleteTwoTone, MoreOutlined } from '@ant-design/icons';
import { Edit } from '@carbon/icons-react';
import { Button, Dropdown, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject'
import ProjectContext from './ProjectContext';

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

interface ConvertedSystem {
    key: number;
    id: number;
    name: string;
}


const Projects = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [projects, setProjects] = useState<ConvertedProject[] | undefined>([])
    const context = useContext(ProjectContext)

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
                    <Button type="dashed" shape="circle" icon={<Edit />} />
                    <Button type="dashed" shape="circle" icon={<DeleteOutlined />} />
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

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="page">
            <Title>Projeler</Title>
            <Table dataSource={projects} columns={columns} pagination={{ pageSize: 20 }} scroll={{ scrollToFirstRowOnChange: true, y: '100%' }} />;
        </div>
    )
}


export default Projects