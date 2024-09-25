import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) =>{
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    const dataUri = parser.format(extName, file.buffer);
    
    return dataUri;
}

export default getDataUri;