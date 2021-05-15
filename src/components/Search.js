import React, { useState, useEffect } from "react";
import { Badge, Space, Switch } from "antd";

export default function Search2(props) {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [searchResulte, setSearchResulte] = useState([]);
  const [searchResulteShow, setSearchResulteShow] = useState([]);

  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสฯ", "ศุกร์"];

  const Loading = () => {
    if (loading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    if (value.length != 0) {
      for (let index = 0; index < allData.length; index++) {
        var obj = allData[index].list.filter((data) => {
          return (
            data.teacher.search(value) !== -1 ||
            data.code.search(value) !== -1 ||
            data.room.search(value) !== -1
          );
        });
        result.push(obj);
      }

      setSearchResulte(result);
      searchShow();
    } else {
      setSearchResulte([]);
      setSearchResulteShow([]);
    }
  };

  const searchShow = () => {
    if (searchResulte != null) {
      var obj = [];
      for (let index = 0; index < searchResulte.length; index++) {
        if (searchResulte[index].length != 0) {
          var obj2 = [];
          for (let index2 = 0; index2 < searchResulte[index].length; index2++) {
            obj2.push(searchResulte[index][index2]);
          }
          obj.push({
            days: days[index],
            list: obj2,
          });
        }
      }
      setSearchResulteShow(obj);
    }
  };

  useEffect(() => {
    setAllData(props.obj);
  }, [props.obj]);

  //   useEffect(() => {
  //     console.log(allData);
  //   }, [allData]);

//   useEffect(() => {
//     console.log(searchResulteShow);
//   }, [searchResulteShow]);

  return (
    <div>
      <div>
        <span
          style={{ marginBottom: 10 }}
          className="ant-input-group-wrapper ant-input-group-wrapper-lg ant-input-search ant-input-search-large ant-input-search-with-button"
        >
          <span className="ant-input-wrapper ant-input-group">
            <input
              onChange={(event) => handleSearch(event)}
              placeholder="ค้นหา : ครู/รหัสวิชา/ห้อง"
              className="ant-input ant-input-lg"
              type="text"
            />
            {/* <span className="ant-input-group-addon">
              <button
                type="button"
                className="ant-btn ant-btn-primary ant-btn-lg ant-input-search-button"
              >
                <span>Search</span>
              </button>
            </span> */}
          </span>
        </span>

        <div className="ant-list ant-list-sm ant-list-split ant-list-bordered ant-list-something-after-last-item">
          <div className="ant-spin-nested-loading">
            <div className="ant-spin-container">
              <ul className="ant-list-items">
                {searchResulteShow.length != 0
                  ? searchResulteShow.map((item) => (
                      <li className="ant-list-item">
                        <div className="ant-list-item-meta">
                          <div className="ant-list-item-meta-content">
                            <h4 className="ant-list-item-meta-title">
                              <a href="https://ant.design">{item.days}</a>
                            </h4>
                            <div className="ant-list-item-meta-description">
                              {/* {item.list.map((item2) => ("| คาบที่ "+item2.index+" ห้อง "+item2.room+" ") )} */}
                              {item.list.map((item2) => (
                                <div>
                                  <Badge
                                    count={
                                      "คาบที่ " +
                                      item2.index +
                                      " ห้อง " +
                                      item2.room+
                                      "  " +
                                      item2.teacher
                                    }
                                    style={{ backgroundColor: "#52c41a" }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>{item.list.length} วิชา</div>
                      </li>

                      //   <li className="ant-list-item">
                      //     {item.days}
                      //     <ul>
                      //       {item.list.map((item2) => {
                      //           <li>{item2.code}</li>
                      //       })}
                      //     </ul>
                      //   </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
