import React from 'react';

import Form from '../form';
import sidebarStyle from './sidebar.module.scss';

const Sidebar = () => (
    <section className={sidebarStyle.sidebar}>
        <Form />
    </section>
);

export default Sidebar;