const fs = require('fs');
const crypto = require('crypto');

//判断文件是否存在

exports.isExistSync = function (path) {
  try {
    return typeof fs.statSync(path) === 'object';
  } catch (e) {
    return false;
  }
};

exports.sha1 = function (str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}
