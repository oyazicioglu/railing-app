import React, { useState } from 'react'
import ProjectTabContext from '../components/page/project/ProjectTabContext';
import "./Home.css";
import { Button, Container, Stack, Tab, Tabs } from 'react-bootstrap';
import { createUId } from '../lib/utils/uid-creator';
import Project from '../components/page/project/Project';
import Projects from '../components/page/project/Projects';
import { ProjectType } from '../components/page/project/ProjectType';

interface Props {
  children?: React.ReactNode
}

type tabType = { key: string, title: string, projectId?: number };

const Home = (props: Props) => {
  const [key, setKey] = useState('home');
  const [tabs, setTabs] = useState<tabType[]>([])

  const openProject = (project: ProjectType) => {
    const key = createUId()
    setTabs([...tabs, { key: key, title: project.name, projectId: project.id }])
    setKey(key)
  }

  const onSelectTab = (tabName: string) => {
    setKey(tabName)
  }

  const newProject = () => {
    const key = createUId()
    setTabs([...tabs, { key: key, title: "Yeni Proje" }])
    setKey(key)
  }

  const changeProjectName = (projectId: number, projectName: string) => {
    const foundTab = tabs.find(t => t.projectId === projectId);
    const foundIndex = tabs.indexOf(foundTab)
    if (foundIndex === -1) return;
    foundTab.title = projectName
    tabs[foundIndex] = foundTab;
    setTabs([...tabs]);
  }

  const closeTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tab: tabType) => {
    e.preventDefault();
    const otherTabs = tabs.filter(t => t.key !== tab.key)
    setTabs(otherTabs);
    setKey("home")
  }

  return (
    <ProjectTabContext.Provider value={{
      open: openProject,
      changeProjectName: changeProjectName,
    }}>
      <div className='home-page'>
        <Tabs
          activeKey={key}
          onSelect={onSelectTab}
          defaultActiveKey="home"
          id="projects-tab"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <Container fluid>
              <Stack direction="horizontal" className='mh-4' gap={3}>
                <h1>Projeler</h1>
                <Button onClick={newProject} className='ms-auto' variant="primary">Yeni Proje</Button>
              </Stack>
              <hr />
              <Projects></Projects>
            </Container>
          </Tab>

          {tabs.map(tab => {
            return <Tab style={{ position: 'relative', height: '100%' }} key={tab.key} eventKey={tab.key} title={
              <Stack direction='horizontal' gap={2}>
                <span>{tab.title}</span>
                <div onClick={(e) => { closeTab(e, tab) }}>x</div>
              </Stack>
            }>
              <Project projectId={tab.projectId}></Project>
            </Tab>
          })}
        </Tabs>
      </div>
    </ProjectTabContext.Provider>
  )
}

export default Home