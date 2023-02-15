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

## Properties

Use the following properties to configure your plugin.

* **path** - The path to your environment variables (default: `'./.env'`).

Example:

```javascript
  plugins: [
    new Dotenv({
      path: '../path_to/.env'
    })
  ]

```
