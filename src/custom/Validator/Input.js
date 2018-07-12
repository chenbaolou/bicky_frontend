export function checkIP(rule, value, callback) {
  const reg = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/;
  if (reg.test(value)) {
    callback();
    return;
  }
  callback('IP地址格式错误');
}

export function checkMAC(rule, value, callback) {
  const reg = /^([a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$/;
  if (reg.test(value)) {
    callback();
    return;
  }
  callback('MAC地址格式错误');
}
