import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import React from "react";

const { TabPane } = Tabs;

export default function CinemaChain() {
  return (
    <section className="schedule">
      <Tabs defaultActiveKey="2" className="max-w-2xl">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Tab 1
            </span>
          }
          key="1"
        >
          Tab 1
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Tab 2
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </section>
  );
}
