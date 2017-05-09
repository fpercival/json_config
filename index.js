const path = require('path');
const fs = require('fs');

const extend = require('nodeutils').extend;

const cfg = {};

function Config(basepath, fileName){
    let configFile;
    let fname = fileName || 'config.json';
    let env = process.env.NODE_ENV || 'testing';
    let base = basepath || process.cwd();
    if(!path.isAbsolute(base)){
        base = path.resolve(base, '.' );
    }
    configFile = path.join(base,  fname);
    if(!fs.existsSync(configFile)){
        configFile = path.join(base, 'default_'+fname);
    }
    if(fs.existsSync(configFile)){
        configFile = require(configFile);
    } else {
        configFile = {};
    }
    if(configFile.env && configFile.env[env]){
        extend(configFile, configFile.env[env]);
        configFile.env = undefined;
    }
    extend(cfg, configFile);
}

cfg.init = Config;

module.exports = cfg;

