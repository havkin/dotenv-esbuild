import ESBuild from 'esbuild';

interface IOptions {
  path: string
}
declare class Dotenv implements ESBuild.Plugin {
  constructor(options?: IOptions);
  name: string;
  setup(build: ESBuild.PluginBuild): void;
}

export default Dotenv;
