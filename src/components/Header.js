import React,{useState,useEffect} from "react";
import { PageHeader } from "antd";

export default function Header() {
  const [time, settime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(
      () => settime(new Date()),
      1000
    );

  }, [])

  return (
    <div style={{"padding-left":10,paddingRight:10,paddingBottom:1}} className="ant-page-header site-page-header ant-page-header-ghost ant-page-header-compact">
      <div className="ant-page-header-heading">
        <div className="ant-page-header-heading-left">
          <div className="ant-page-header-back">
          </div>
          <span className="ant-page-header-heading-title" title="Title">
            Time Table
          </span>
        </div>
        <div className="ant-page-header-heading-left">
          <div className="ant-page-header-back">
          </div>
          <span className="ant-page-header-heading-title" title="Title">
            {time.toLocaleTimeString('th-TH')}
          </span>
        </div>
      </div>
    </div>
  );
}
