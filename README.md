# generator-vars-jekyll

VARIANTE's Yeoman generator for a Jekyll app.

## Features

- [Jekyll](http://jekyllrb.com)
- [Gulp](http://gulpjs.com) setup for CSS, JavaScript, and HTML minification as well as static asset revisioning (appending content hash to filenames)
- [BrowserSync](http://www.browsersync.io) for rapid development
- [Sass](http://sass-lang.com) with Scalable and Modular Architecture (SMACSS) setup
- [Browserify](http://browserify.org)
- [Babel](https://babeljs.io) for coding in ES6 standards
- Watchify for quick Browserify rebundling
- [Heroku](http://heroku.com) setup

## Libraries

- Bootstrap (optional)
- jQuery (optional)

For [Modernizr](http://modernizr.com), manually configure your custom build and put it in ```app/assets/vendor``` folder, then include ```/assets/vendor/vendor.js``` in your HTML.

## Structure

```
.
+-- .buildpacks
+-- .editorconfig
+-- .gitattributes
+-- .gitignore
+-- .jshintrc
+-- app
|   +-- .jshintrc
|   +-- _assets
|   |   +-- css
|   |   |   +-- base
|   |   |   |   +-- definitions.scss
|   |   |   |   +-- layout.scss
|   |   |   |   +-- normalize.scss
|   |   |   |   +-- typography.scss
|   |   |   +-- components
|   |   |   +-- modules
|   |   |   +-- main.scss
|   |   +-- images
|   |   |   +-- apple-touch-icon-57x57.png
|   |   |   +-- apple-touch-icon-72x72.png
|   |   |   +-- apple-touch-icon-114x114.png
|   |   |   +-- apple-touch-icon.png
|   |   |   +-- favico.png
|   |   |   +-- og-image.png
|   |   +-- js
|   |   |   +-- main.js
|   |   +-- vendor
|   +-- _data
|   +-- _drafts
|   +-- _includes
|   +-- _layouts
|   |   +-- default.html
|   +-- _posts
|   +-- 404.html
|   +-- 500.html
|   +-- favico.ico
|   +-- index.html
|   +-- robots.txt
+-- node_modules
+-- public // runtime files go here
+-- tasks
|   +-- .jshintrc
|   +-- .taskconfig
|   +-- build.js
|   +-- clean.js
|   +-- generate.js
|   +-- serve.js
+-- test // mocha tests
+-- vendor
|   +-- bundle
+-- _config.yml
+-- Gemfile
+-- gulpfile.js
+-- package.json
+-- server.js
```

## Tasks

```gulp build --debug```: Builds all source files in the ```app``` directory but skips all compression tasks.

```gulp build```: Builds all source fies in the ```app``` directory with asset compression such as CSS/HTML/JavaScript minification and deploys them to the ```public``` directory.

```gulp serve --debug --watch```: Serves the ```.tmp``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke its corresponding build tasks. This is great for debugging.

```gulp serve```: Serves the ```public``` directory to ```localhost```.

See ```tasks/.taskconfig``` for more custom flags such as ```--skip-js-min```, ```--skip-css-min```, etc.

## Usage

Install ```yo```:
```
npm install -g yo
```

Install ```generator-vars-jekyll```:
```
npm install -g generator-vars-jekyll
```

Create a new directory for your project and ```cd``` into it:
```
mkdir new-project-name && cd $_
```

Generate the project:
```
yo vars-jekyll [app-name]
```

For details on initial setup procedures of the project, see its generated ```README.md``` file.

## Release Notes

### 2.0.0
1. Updated version numbers of NPM package dependencies.
2. Gulp tasks are now compressed into fewer files. As a result `require-dir` dependency is no longer necessary and is removed from `package.json`.
3. Task configurations are now stored in `./tasks/.taskconfig`.
4. Static files such as images, stylesheets, and JavaScripts are now stored in `app/_assets` (instead of `app/assets`). These files are no longer generated by the Jekyll generator and are now being deployed by the Gulp pipeline. This is for faster development iteration using `gulp-watch`. As a result, liquid templating static files is discouraged.
5. `favicon.png`, Apple touch and Open Graph specific icons are now moved to `app/_assets/images`. `favicon.ico` remains in the root directory.
6. `gulp-imagemin` is removed because it is the most taxing task in the Gulp pipeline. Images should be optimized outside of the Gulp pipeline instead.
6. Ruby version from `2.0.0` to `2.2.1`.
7. Minor syntactic sugar changes.
8. Lots of optimizations, particularly boosting the efficiency of automated rebuilds during development.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
