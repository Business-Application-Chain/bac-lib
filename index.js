let bip39 = require('bip39');
let HDNode = require('./verify/hdnode')
let ECPair = require('./verify/ecpair')
let bacSign = require('./sign/bacSign')

var bacLib = {
    bacBip39: bip39,
    bacHDNode: HDNode,
    bacECpair: ECPair,
    bacSign: bacSign.sign
}

module.exports = bacLib



