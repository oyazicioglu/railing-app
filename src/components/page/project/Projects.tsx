import { CheckOutlined } from '@ant-design/icons';
import { Button, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
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
    active: boolean;
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
                <Button onClick={() => { openProject(record) }} type="link">{record.name}</Button>
            ),
        },
        {
            title: 'Durum',
            dataIndex: 'active',
            key: 'active',
            width: '64px',
            render: (_, record) => (
                record.active ? <CheckOutlined /> : ''
            )
        },
        {
            title: 'Güncelleme Tarihi',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: '256px'
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '256px'
        },
    ];


    const openProject = (project: ConvertedProject) => {
        context.open({
            active: project.active,
            createdAt: new Date(project.createdAt),
            name: project.name,
            id: project.id,
            updatedAt: new Date(project.updatedAt)
        });
    }

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
                active: project.active,
                createdAt: new Date(project.createdAt).toLocaleDateString('tr', { dateStyle: 'medium' }),
                updatedAt: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('tr', { dateStyle: 'medium' }) : '-',
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