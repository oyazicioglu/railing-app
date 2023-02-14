import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './views/home/Home';
import { Projects } from './views/projects/Projects';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <MemoryRouter>
        <Routes>
            <Route element={<DefaultLayout></DefaultLayout>}>
                <Route element={<Home></Home>} path="/"></Route>
                <Route element={<Projects></Projects>} path="/projects"></Route>
            </Route>
        </Routes>
    </MemoryRouter>
);
