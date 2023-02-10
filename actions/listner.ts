import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";

import { ethers } from "ethers";
import axios from "axios";
import Test from "./Test.json";

export const safeMint: ActionFn = async (context: Context, event: Event) => {
    console.log("transferListner triggered");
    let transactionEvent = event as TransactionEvent;
    console.log("transactionEvent",transactionEvent);
    const ifc = new ethers.utils.Interface(Test.abi);

    const { data, topics } = transactionEvent.logs[0];
    const result = ifc.decodeEventLog("Transfer", data, topics);
    console.log(
        `result ${result}`
    );
    // await context.storage.putJson(result.toString(), result);
    axiosAPIcall(result);
};

const axiosAPIcall = async (data: any) => {
try {
console.log("Calling started with data", data);
await axios.post(
`some URL will go here`, data
);
console.log("called api");
} catch (err) {
    console.log("error sending api requests");
}
}