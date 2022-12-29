// The idea and part of the code are from "https://github.com/mrsteele/dotenv-webpack"
const dotenv = require("dotenv");
const fs = require("node:fs");

const loadFile = ({ file }) => {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (error) {
    console.log("🚀 ~ error", error);
    return "";
  }
};

const getEnvs = () => {
  const path = "./.env";

  return dotenv.parse(
    loadFile({
      file: path,
    })
  );
};

const gatherVariables = () => {
  const vars = {};

  const env = getEnvs();

  Object.keys(env).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(vars, key)) {
      vars[key] = env[key];
    }
  });
  return vars;
};

const formatData = ({ variables = {} }) => {
  const prefix = "process.env.";
  const formatted = Object.keys(variables).reduce((obj, key) => {
    const vValue = variables[key];
    const vKey = `${prefix}${key}`;
    obj[vKey] = JSON.stringify(vValue);

    return obj;
  }, {});

  return formatted;
};

class Dotenv {
  name = "Dotenv";

  setup(build) {
    const variables = gatherVariables();
    const data = formatData({
      variables,
    });
    console.log("🚀 ~ data", data);
    const options = build.initialOptions;
    options.define = options.define || {};
    for (const [key, value] of Object.entries(data)) {
      options.define[key] = value;
    }
  }
}

module.exports = Dotenv;
