import { App, theme } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import { createRoot } from 'react-dom/client';
import Home from './view/Home';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ConfigProvider theme={{
        algorithm: theme.compactAlgorithm,
    }}>
        <App>
            <Home></Home>
        </App>
    </ConfigProvider>
);
