import generateJSDirectory from "../utils/generateJSDirectory.js";
import generateTSDirectory from "../utils/generateTSDirectory.js";

const generateDirectory = async (req, res) => {
  const {
    template, // e.g., "mvc-javascript" or "mvc-typescript"
  } = req.body;

  if(template === "mvc-javascript") {
    return await generateJSDirectory(req, res);
  } else {
    return await generateTSDirectory(req, res);
  }
};

export default generateDirectory;
