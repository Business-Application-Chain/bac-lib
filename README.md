//助记词
mnemonic_string = "soul bounce omit zone believe true behave during uncle eye salmon awful";
let seed = bip39.mnemonicToSeed(mnemonic_string);
let node = HDNode.fromSeedHex(seed);
let keyPair = ECPair.fromWIF(node.keyPair.toWIF());
let privateKey = keyPair.d.toBuffer(32);
let pub = keyPair.getPublicKeyBuffer();
let a = {
    "wid": "219c2234-be57-4058-8b2e-35b12a633308",
};
//
var signature = bacSign.sign(JSON.stringify(a), privateKey, 1);
// 助记词
console.log("助记词 -> ", mnemonic_string);
// // address
address = HDNode.fromSeedBuffer(seed).getAddress();
console.log("address -> ", address);
// // // 私钥
console.log('privateKey -> ', privateKey.toString('hex'));
// // 签名
console.log('signature -> ', signature.toString("hex"));
// // data
console.log('data -> ', JSON.stringify(a));