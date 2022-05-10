# Installing:

To install, use `npm ci` instead of `npm install`, in order to do a "deterministic install" (this installs the dependency tree in *package-lock.json* and ensures that you are running with the same dependencies) [more on this](https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5).
```
npm ci
```

## Running dev server:
```
npm run dev
```

## Building:
```
npm run build
```
