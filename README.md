# dotenv-esbuild

ESBuild plugin that use dotenv to setup environment variables

## Installation

```bash
npm install dotenv-esbuild --save-dev
```

## Usage

```javascript
import esbuild from "esbuild"
import Dotenv from 'dotenv-esbuild';

esbuild.build({
  ...
  plugins: [ new Dotenv()],
})
```