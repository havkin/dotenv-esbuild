// The idea and part of the code are from "https://github.com/mrsteele/dotenv-webpack"
const dotenv = require('dotenv');
const fs = require('node:fs');

let config = {
  path: './.env',
  prefix: 'process.env.',
};


const loadFile = ({ file }) => {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    console.log(`Failed to load ${file}.`);
    return '';
  }
};

const getEnvs = () => {
  return dotenv.parse(
    loadFile({
      file: config.path,
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

  const formatted = Object.keys(variables).reduce((obj, key) => {
    const vValue = variables[key];
    const vKey = `${config.prefix}${key}`;
    obj[vKey] = JSON.stringify(vValue);

    return obj;
  }, {});

  return formatted;
};

class Dotenv {
  name = 'Dotenv';
  constructor(options = {}) {
    config = Object.assign(config, options);
  }

  setup(build) {
    const variables = gatherVariables();
    const data = formatData({
      variables,
    });
    const options = build.initialOptions;
    options.define = options.define || {};
    for (const [key, value] of Object.entries(data)) {
      options.define[key] = value;
    }
  }
}

module.exports = Dotenv;
