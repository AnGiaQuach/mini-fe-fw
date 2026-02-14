import * as Sample from "../../sample/sample.js";
import { convertToVirtualDOM } from "../convertToDOM.js";

let res = convertToVirtualDOM(Sample);
console.dir(res, { depth: null });
