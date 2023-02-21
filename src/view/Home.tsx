import React, { useRef, useState } from 'react'
import { Tabs, TabsProps, ConfigProvider, theme } from 'antd'
import Projects from '../components/page/project/Projects';
import ProjectContext from '../components/page/project/ProjectContext';
import { IProject } from '../components/page/project/IProject';
import Project from '../components/page/project/Project';
import { createUId } from '../lib/utils/uid-creator';
import "./Home.css";

interface Props {
  children?: React.ReactNode
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes: TabsProps['items'] = new Array(1).fill(null).map((_, index) => {
  const id = String(index + 1);
  return { label: `Özet`, children: <Projects></Projects>, key: "0", closable: false }
});

const Home = (props: Props) => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = (projectName: string, projectId?: number, children?: React.ReactNode) => {
    let newActiveKey = '';
    if (!projectId) {
      newActiveKey = createUId()
    } else {
      newActiveKey = projectId.toString();
    }

    setItems([...items, { label: projectName, children: children, key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove', projectId?: number, projectName?: string) => {
    if (action === 'add') {
      add('Yeni Proje', undefined, <Project></Project>);
    } else {
      remove(targetKey);
    }
  };

  const openProject = (projectId: number, projectName: string) => {
    add(projectName, projectId,
      <Project projectId={projectId}></Project>
    )
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
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
        />
      </div>
    </ProjectContext.Provider>
  )
}

Home.propTypes = {

}

export default Home