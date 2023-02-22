import React, { ReactNode, useRef, useState } from 'react'
import ProjectContext from '../components/page/project/ProjectContext';
import { IProject } from '../components/page/project/IProject';
import "./Home.css";
import { Button, Container, Stack, Tab, TabProps, Tabs } from 'react-bootstrap';
import { ProjectTab } from '../components/page/project/ProjectTab';
import { createUId } from '../lib/utils/uid-creator';
import Project from '../components/page/project/Project';
import Projects from '../components/page/project/Projects';

interface Props {
  children?: React.ReactNode
}

const Home = (props: Props) => {
  const [key, setKey] = useState('home');
  const [tabs, setTabs] = useState<{ key: string, title: string, projectId?: number }[]>([])

  const openProject = (projectId: number, projectName: string) => {
    const key = createUId()
    setTabs([...tabs, { key: key, title: projectName }])
    setKey(key)
  }

  const onSelectTab = (tabName: string) => {
    setKey(tabName)
  }

  const addProject = () => {
    const key = createUId()
    setTabs([...tabs, { key: key, title: "Yeni Proje" }])
    setKey(key)
  }

  const closeProject = (project: IProject) => {
    console.log(project)
  }

  return (
    <ProjectContext.Provider value={{
      open: openProject,
      close: closeProject
    }}>
      <div className='home-page'>
        <Tabs
          activeKey={key}
          onSelect={onSelectTab}
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <Container fluid>
              <Stack direction="horizontal" className='mh-4' gap={3}>
                <h1>Projeler</h1>
                <Button onClick={addProject} className='ms-auto' variant="primary">Yeni Proje</Button>
              </Stack>
              <hr />
              <Projects></Projects>
            </Container>
          </Tab>

          {tabs.map(tab => {
            return <Tab style={{ position: 'relative', height: '100%' }} key={tab.key} eventKey={tab.key} title={tab.title}>
              <Project projectId={tab.projectId}></Project>
            </Tab>
          })}
        </Tabs>
      </div>
    </ProjectContext.Provider>
  )
}

export default Home