import { createRoot } from 'react-dom/client';
import Home from './view/Home';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Home></Home>
);
