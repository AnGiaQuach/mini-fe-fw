import { convertToRealDOM } from "./compiler/convertToDOM";
import { convertToVirtualDOM } from "./compiler/convertToDOM";
import * as Sample from "./sample/sample.js";

console.log(convertToRealDOM(convertToVirtualDOM(Sample)));
