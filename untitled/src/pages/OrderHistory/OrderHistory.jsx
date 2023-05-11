import React from "react";
import { useState, useEffect } from "react";

function OrderHistory() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
      <div className="mx-auto w-full">
        <div className="">
          
        </div>
        <div>

        </div>
      </div>
  );
}

export default OrderHistory;