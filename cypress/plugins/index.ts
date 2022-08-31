import "dotenv/config";

const plugins = (_on, config) => {
  config.env = process.env;

  return config;
};

export default plugins;
