import ESBuild from 'esbuild';
declare class Dotenv implements ESBuild.Plugin {
  name: string;
  setup(build: ESBuild.PluginBuild): void;
}

export default Dotenv;
