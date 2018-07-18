var typeforce = require('typeforce')
var types = require('./types')
var createHmac = require('create-hmac')
var BigInteger = require('bigi')
var ECPair = require('./ecpair')
var Network = require('../verify/networks')

function HDNode(keyPair, chainCode) {

    typeforce(types.tuple('ECPair', types.Buffer256bit), arguments)

    if (!keyPair.compressed) throw new TypeError('BIP32 only allows compressed keyPairs')

    this.keyPair = keyPair
    this.chainCode = chainCode
    this.depth = 0
    this.index = 0
    this.parentFingerprint = 0x00000000
}


HDNode.fromSeedHex = function (hex, network) {

    return HDNode.fromSeedBuffer(Buffer.from(hex, 'hex'), network)
}

HDNode.fromSeedBuffer = function (seed, network) {
    if (typeof network ==='string') network = Network[network]
    typeforce(types.tuple(types.Buffer, types.maybe(types.Network)), arguments)

    if (seed.length < 16) throw new TypeError('Seed should be at least 128 bits')
    if (seed.length > 64) throw new TypeError('Seed should be at most 512 bits')

    var I = createHmac('sha512', HDNode.MASTER_SECRET).update(seed).digest()
    var IL = I.slice(0, 32)
    var IR = I.slice(32)
    var pIL = BigInteger.fromBuffer(IL)
    var keyPair = new ECPair(pIL, null, {
        network: network
    })

    return new HDNode(keyPair, IR)
}

HDNode.prototype.getAddress = function () {
    return this.keyPair.getAddress()
}

HDNode.MASTER_SECRET = Buffer.from('BAC seed', 'utf8')
module.exports = HDNode