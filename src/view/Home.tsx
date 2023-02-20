import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, TabsProps, ConfigProvider, theme } from 'antd'
import Projects from '../components/page/project/Projects';
import ProjectContext from '../components/page/project/ProjectContext';
import { IProject } from '../components/page/project/IProject';
import Project from '../components/page/project/Project';

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
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = (project: IProject, children?: React.ReactNode) => {

    const newActiveKey = project.id.toString();
    setItems([...items, { label: project.name, children: children, key: newActiveKey }]);
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

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove', project?: IProject) => {
    if (action === 'add') {
      add(project);
    } else {
      remove(targetKey);
    }
  };

  const openProject = (project: IProject) => {
    add(project,
      <Project project={project}></Project>
    )

  }

  return (
    <ProjectContext.Provider value={{
      open: openProject
    }}>
      <div className='page'>
        <Tabs
          hideAdd
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