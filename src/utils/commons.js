/**
 * 用于get方法后面参数的拼接，传入data是对象
 * @param {*} name 
 */
export const getUrlConcat = function (data) {
  let dataStr = ''; //数据拼接字符串
  let url = '';
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  });
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&')); // 去除掉最后一个"&"字符
    url = url + '?'+ dataStr;
  }
  return url
};

/**
 * 处理图片路径
 */
export const getImgPath = (path) => {
  //传递过来的图片地址需要处理后才能正常使用(path) {
    let suffix;
    if (!path) {
      return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg'
    } else {
      suffix = '.png'
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url
};


export const suitableBool = (rawBoolenValue) => {
  if (rawBoolenValue) {
    return "text-primary";
  } else {
    return "text-danger";
  }
};


export const suitableColor = (rawValue) => {
  let floatValue = parseFloat(rawValue);
  if (floatValue >= 80.0) {
    return "bg-danger";
  } else if (floatValue <= 20.0) {
    return "bg-secondary";
  } else {
    return "bg-primary";
  }
};

export const fix = (num, length) => {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

export const getFullDay = (date) =>{
    let monthNum = fix(date.getMonth() + 1, 2);
    return (date.getFullYear() + "-" + monthNum + "-" + fix(date.getDate(), 2));
}