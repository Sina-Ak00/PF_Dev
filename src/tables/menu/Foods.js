import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../controls/MuiButton";
import moment from "jalali-moment";

const useStyles = makeStyles({
  printTable: {
    width: "250px",
    borderTop: "1px solid black",
    borderCollapse: "collapse",
  },
  desc: {
    textAlign: "start",
    alignContent: "start",
    width: "75px",
    maxWidth: "75px",
  },
  quantity: {
    textAlign: "center",
    alignContent: "center",
    width: "40px",
    maxWidth: "40px",
    wordBreak: "break-all",
  },
  price: {
    width: "40px",
    maxWidth: "100px",
    textAlign: "center",
    alignContent: "center",
  },
  centered: {
    textAlign: "center",
    alignContent: "center",
  },
  righted: {
    textAlign: "end",
    alignContent: "end",
  },
  lefted: {
    textAlign: "start",
    alignContent: "start",
  },
  ticket: {
    textAlign: "center",
    alignContent: "center",
    width: "250px",
    maxWidth: "350px",
    maxheight: "100%",
  },
  total: {
    border: "solid 0.5px",
  },
  tax: {
    textAlign: "start",
    alignContent: "start",
    width: "100px",
    maxWidth: "100px",
  },
});

const Foods = (props) => {
  let componentRef = useRef();

  const { cartItems } = props;
  const classes = useStyles();

  // const handleClick = () => {
  //   const data = {
  //     id: 0,
  //     foods:cartItems,
  //     totalPrice: props.totalPrice,
  //     Date: moment().format("jYYYY/jM/jD HH:mm"),
  //   };
  //   TotalServices.insertTotal(data);
  //   props.addTurn();
  // };
  return (
    <>
      <ReactToPrint
        trigger={() => <Button text="پرینت" />}
        content={() => componentRef}
      />
      <div ref={(el) => (componentRef = el)} className={classes.ticket}>
        {/* <img href="https://www.vecteezy.com/free-vector/potato-logo" alt="Logo" /> */}
        <p className={classes.centered}>Sandwich Factory</p>
        <p className={classes.lefted} style={{ fontSize: "13px" }}>
          {moment().format("jYYYY/jM/jD HH:mm")}
        </p>
        <table className={classes.printTable} style={{ direction: "rtl" }}>
          <thead>
            <tr>
              <th className={classes.desc}>نام محصول</th>
              <th className={classes.quantity}>تعداد</th>
              <th className={classes.price}>مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td className={classes.desc}>{item.FName}</td>
                  <td className={classes.quantity}>{item.qty}</td>
                  <td className={classes.price}>
                    {Number(item.FPrice).toLocaleString(2)}
                  </td>
                </tr>
              ))}
            {/* <tr style={{ borderTop: "1px solid black" }}>
              <td className={classes.tax}>جمع</td>
              <td className={classes.quantity}></td>
              <td className={classes.price}>
                {props.itemsPrice?.toLocaleString(2)}
              </td>
            </tr> */}
            {/* <tr>
              <td className={classes.tax}>9% مالیات بر ارزش افزوده</td>
              <td className={classes.quantity}></td>
              <td className={classes.price}>
                {props.taxPrice?.toLocaleString(2)}
              </td>
            </tr> */}
            <tr className={classes.total} style={{ paddingTop: "5px" }}>
              <td className={classes.desc}>مبلغ پرداختی</td>
              <td className={classes.quantity}></td>
              <td className={classes.price}>
                {props.totalPrice?.toLocaleString(2)}
              </td>
            </tr>
          </tbody>
        </table>
        {props.address && <p className={classes.righted}>آدرس:{props.address}</p>}
        <p className={classes.righted}>نوبت شما:{props.turn}</p>
        <p className={classes.centered}>غذای خوب نیاز به تبلیغ ندارد</p>
        <p className={classes.centered}>
          برای انتقادات و پیشنهادات به 09128486406
        </p>
      </div>
    </>
  );
};

export default Foods;
