import React, { useEffect, useState, Component } from "react";

import { Table, Tag, Space } from "antd";
import Search from "./Search";

const { Column, ColumnGroup } = Table;

export default function Table2() {
  const [data, setData] = useState([]);
  const [color_list, setColorList] = useState([]);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  const [Hour, setHour] = useState(new Date().getHours());
  const [Minute, setMinute] = useState(new Date().getMinutes());
  const [Seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
      setSeconds(new Date().getSeconds());
    }, 1000);
  }, []);

  // useEffect(() => {
  //   console.log(Hour, Minute);
  // }, [Hour, Minute]);

  const getData = () => {
    fetch(
      "https://time-table-2fa59-default-rtdb.asia-southeast1.firebasedatabase.app/room_data/m603.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const getColorList = () => {
    fetch(
      "https://time-table-2fa59-default-rtdb.asia-southeast1.firebasedatabase.app/color_list.json"
    )
      .then((res) => res.json())
      .then((data) => setColorList(data));
  };

  const getList = () => {
    fetch(
      "https://time-table-2fa59-default-rtdb.asia-southeast1.firebasedatabase.app/list_time.json"
    )
      .then((res) => res.json())
      .then((data) => setList(data));
  };

  const getTitle = () => {
    fetch(
      "https://time-table-2fa59-default-rtdb.asia-southeast1.firebasedatabase.app/title.json"
    )
      .then((res) => res.json())
      .then((data) => setTitle(data));
  };

  useEffect(() => {
    getData();
    getColorList();
    getList();
    getTitle();
  }, []);

  // const check_color_current = (time,day) =>{
  //   for (let index = 0; index < list.length; index++) {
  //     var checkHour = list[index].HourStart <= Hour && list[index].HourEnd > Hour
  //     // var checkHour = list[index].HourStart <= Hour
  //     var checkMinute = list[index].MinuteStart <= Minute
  //     if (checkHour && checkMinute && time == index+1 && day == 1) {
  //         return 'aquamarine'
  //     }else if (checkHour &&checkMinute && time == index+2 && day == 1) {
  //       return '#7fffd42e'
  //     }

  //   }
  // }



  //   const days = ["จันทร์","อังคาร","พุธ","พฤหัสฯ","ศุกร์"]

  return (
    //   <div></div>
    <div style={{ padding: 10 }}>
      {/* <center><nobr><h3>{title}</h3></nobr></center> */}
      <div className="ant-table">
        <Search obj={data} />
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table style={{ tableLayout: "auto" }}>
              <colgroup />
              <thead className="ant-table-thead">
                <tr>
                  <th className="ant-table-cell">
                    <nobr>
                      <center>ชั่วโมงที่</center>
                    </nobr>
                    <br />
                    <nobr>
                      <center>เวลา</center>
                    </nobr>
                  </th>
                  {list.map((item) => (
                    <th className="ant-table-cell">
                      <center>{item.index}</center>
                      <br />
                      <nobr>
                        <center>{item.time}</center>
                      </nobr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {data.map((item) => (
                  <tr className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">
                      <a>
                        <center>{item.time}</center>
                      </a>
                    </td>
                    {item.list.map((item2) => (
                      <Tb
                        obj={item2}
                        list={list}
                        Hour={Hour}
                        Minute={Minute}
                        Seconds={Seconds}
                        color_list={color_list}
                      />
                      // <td
                      //   style={{ color: check_color(item2.code) }}
                      //   className="ant-table-cell"
                      // >
                      //   <center>
                      //     <b>
                      //       <nobr>{item2.code}</nobr>
                      //     </b>
                      //     <br />
                      //     <b>
                      //       <nobr>{item2.teacher}</nobr>
                      //     </b>
                      //     <br />
                      //     <b>
                      //       <nobr>{item2.room}</nobr>
                      //     </b>
                      //   </center>
                      // </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tb(props) {
  const [current, setcrunent] = useState(false);
  const [timeLeft, settimeLeft] = useState(0);
  useEffect(() => {
    for (let index = 0; index < props.list.length; index++) {
      if (
        props.Hour >= props.list[index].HourStart &&
        props.Hour <= props.list[index].HourEnd
      ) {
        console.log(props.Hour)
        if (
          // props.Minute >= props.list[index].MinuteStart &&
          props.Minute <= props.list[index].MinuteEnd
        ) {
        console.log(props.Minute)

          if (props.list[index].index === props.obj.index) {
            setcrunent(true);
          } else {
            setcrunent(false);
          }
        }

        // console.log(props.obj.index)
        // console.log(props.Hour)
        // console.log(props.Hour)
        // console.log(props.Minute)
      }
    }
    // if (props.Seconds > 20) {
    //   setcrunent(true)
    // }else{
    //   setcrunent(false)
    // }
  }, [props.Minute]);

  const check_color = (code) => {
    for (let index = 0; index < props.color_list.length; index++) {
      if (code === props.color_list[index].code) {
        return props.color_list[index].color;
      } else {
        continue;
        // return "black";
      }
    }
  };

  useEffect(() => {
    // for (let index = 0; index < props.list.length; index++) {
    //   if (
    //     props.Hour >= props.list[index].HourStart &&
    //     props.Hour <= props.list[index].HourEnd
    //   ) {
    //     console.log(props.Hour)
    //     if (
    //       // props.Minute >= props.list[index].MinuteStart &&
    //       props.Minute <= props.list[index].MinuteEnd
    //     ) {
    //     console.log(props.Minute)

    //       if (props.list[index].index === props.obj.index) {
    //         setcrunent(true);
    //       } else {
    //         setcrunent(false);
    //       }
    //     }

    //     // console.log(props.obj.index)
    //     // console.log(props.Hour)
    //     // console.log(props.Hour)
    //     // console.log(props.Minute)
    //   }
    // }
  }, [])

  return (
    <td 
    style={{ color: check_color(props.obj.code) }} 
    // className={current ? "ant-table-cell bg-red" : "ant-table-cell"}
    className="ant-table-cell"
    >
      {/* {props.Hour} */}
      <center>
        <b>
          <nobr>{props.obj.code}</nobr>
        </b>
        <br />
        <b>
          <nobr>{props.obj.teacher}</nobr>
        </b>
        <br />
        <b>
          <nobr>{props.obj.room}</nobr>
        </b>
      </center>
    </td>
  );
}
