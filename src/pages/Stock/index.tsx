// 练习 useReducer使用
import React, { useReducer } from "react";
import { Card, Table, Button } from "antd";

const Stock: React.FC = () => {
  const initData = [
    { id: 1, name: "商品1", price: 10, quantity: 5 },
    { id: 2, name: "商品2", price: 20, quantity: 3 },
    { id: 3, name: "商品3", price: 15, quantity: 8 },
  ];
  const intFn = (state: any) => state;
  const reducer = (state: any, action: any) => {
    const item  = state.find((item: any) => item.id === action.id);
    switch (action.type) {
      case "add":
        item.quantity++;
        return [...state]
      case "sub":
        item.quantity--;
        return [...state]
      case "delete":
        return state.filter((item: any) => item.id !== action.id);
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(reducer, initData, intFn);
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: "20%" },
    { title: "名称", dataIndex: "name", key: "name", width: "20%" },
    { title: "价格", dataIndex: "price", key: "price", width: "25%" },
    {
      title: "数量",
      dataIndex: "quantity",
      key: "quantity",
      width: "25%",
      render: (text: number, record: any, index: number) => (
        <>
          <div className="flex items-center gap-[10px]">
            <Button
            type="primary"
            onClick={() =>
              dispatch({ type: "add", id: record.id })
            }
          >
            +
          </Button>
          <div className="px-[10px]">{text}</div>
          <Button
            danger
            onClick={() =>
              dispatch({ type: "sub", id: record.id })
            }
          >
            -
          </Button>
          </div>
        </>
      ),
    },
    { title: "操作", key: 'action', width: "15%", render: (text: any, record: any) => 
      (
        <Button type="primary" danger onClick={() => { dispatch({ type: "delete", id: record.id }) }}>删除</Button> 
      )
    },
  ];
  return (
    <Card>
      <Table
        columns={columns}
        dataSource={data}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={2} />
              <Table.Summary.Cell index={2} colSpan={2}>
                合计：
                {data.reduce(
                  (sum: number, item: any) => sum + item.price * item.quantity,
                  0
                )}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Card>
  );
};
export default Stock;
