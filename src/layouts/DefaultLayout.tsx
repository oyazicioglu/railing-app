import { NavLink, Outlet } from 'react-router-dom';
import { Avatar } from '../../src/components/ui/avatar/Avatar';
import { Container } from '../../src/components/ui/container/Container';
import { Sidenav } from '../../src/components/ui/sidenav/Sidenav';
import { SidenavItem } from '../../src/components/ui/sidenav/SidenavItem';

import './DefaultLayout.css';

export const DefaultLayout = () => {
    return (
        <section className="layout">
            <Sidenav>
                <SidenavItem>
                    <Avatar letters="ÖY"></Avatar>
                </SidenavItem>
                <SidenavItem active>
                    <NavLink to={'/'}>Dashboard</NavLink>
                </SidenavItem>
                <SidenavItem>
                    <NavLink to={'/projects'}>Projeler</NavLink>
                </SidenavItem>
            </Sidenav>
            <Container fluid>
                <Outlet></Outlet>
            </Container>
        </section>
    );
};
