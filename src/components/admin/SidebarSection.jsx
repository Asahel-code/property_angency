import React from 'react';
import { Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const SidebarSection = () => {
  return (
    <div className="w-fit h-fit">
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
            >
              <Link to="/">
                Dashboard
              </Link>

            </Sidebar.Item>
            <Sidebar.Item
            >
              Add property
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SidebarSection