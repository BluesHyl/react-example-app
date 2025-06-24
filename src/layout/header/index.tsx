import { Breadcrumb } from "antd";
export default function Header() {
  return (
    <div className="header">
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Application List',
          },
          {
            title: 'Application',
          },
        ]}
      />
    </div>
  );
}