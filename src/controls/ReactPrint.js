import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "../../controls/MuiButton";

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button
          text="پرینت"/>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        {/* <ComponentToPrint ref={(el) => (componentRef = el)} /> */}
      </div>
    </>
  );
}