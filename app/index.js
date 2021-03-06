// (c) Andrew Wei

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const _ = require('underscore.string');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.argument('projectname', {
      type: String,
      required: false
    });

    this.appname = _.slugify(this.projectname || this.appname);

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });
  },

  initializing: function() {
    this.pkg = require('../package.json');
    this.paths = {
      src: 'app',
      build: 'public'
    };

    this.log(yosay('\'Allo \'allo! Out of the box I include Sass, Browserify and a gulpfile.js to build your app.'));

    let done = this.async();

    let prompts = [{
      type: 'input',
      name: 'appauthor',
      message: 'Who is the author? (this will appear in the header of your source files)'
    }];

    this.prompt(prompts, (answers) => {
      this.appauthor = answers.appauthor;
      done();
    });
  },

  writing: function() {
    let files = glob.sync('**', { dot: true, cwd: this.sourceRoot(), nodir: true });

    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      let src = path.join(this.sourceRoot(), f);
      let basename = path.basename(f);

      switch (basename) {
        case '.DS_Store':
          // Do nothing
          break;
        case 'gitignore':
          this.template(src, path.join(path.dirname(f), `.${basename}`));
          break;
        default:
          if (~['.png', '.jpg', '.ico'].indexOf(path.extname(basename)))
            this.copy(src, path.join(path.dirname(f), basename));
          else
            this.template(src, path.join(path.dirname(f), basename));
      }
    }
  },

  install: {
    bundler: function() {
      let done = this.async();

      if (this.options['skip-install']) {
        this.log('Skipping gem dependency installation. You will have to manually run ' + chalk.yellow.bold('bundle install --path vendor/bundle') + '.');
        done();
      } else {
        this.log(chalk.magenta('Installing gems for you using your ') + chalk.yellow.bold('Gemfile') + chalk.magenta('...'));
        this.spawnCommand('bundle', ['install', '--path', 'vendor/bundle']).on('exit', (code) => {
          if (code !== 0)
            this.log(chalk.red('Installation failed. Please manually run ') + chalk.yellow.bold('bundle install --path vendor/bundle') + chalk.red('.'));
          done();
        });
      }
    },

    npm: function() {
      if (this.options['skip-install']) {
        this.log('Skipping node dependency installation. You will have to manually run ' + chalk.yellow.bold('npm install') + '.');
      } else {
        this.log(chalk.magenta('Installing node modules for you using your ') + chalk.yellow.bold('package.json') + chalk.magenta('...'));
        this.installDependencies({ skipMessage: true, bower: false });
      }
    }
  },

  end: function() {
    this.log(chalk.green('Finished generating app! See the generated ') + chalk.yellow('README.md') + chalk.green(' for more guidelines. To start developing right away, run: ') + chalk.yellow.bold('npm run dev'));
  }
});
