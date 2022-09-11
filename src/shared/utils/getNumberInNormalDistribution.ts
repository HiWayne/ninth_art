/**
 * @description 得到正态分布的值
 * @param mean 均值
 * @param std_dev 68.26%左右的标准差
 * @returns {number}
 */
export const getNumberInNormalDistribution = (
  mean: number,
  std_dev: number
) => {
  return mean + randomNormalDistribution() * std_dev;
};

function randomNormalDistribution() {
  let u = 0.0,
    v = 0.0,
    w = 0.0,
    c = 0.0;
  do {
    //获得两个（-1,1）的独立随机变量
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w == 0.0 || w >= 1.0);
  //这里就是 Box-Muller转换
  c = Math.sqrt((-2 * Math.log(w)) / w);
  //返回2个标准正态分布的随机数，封装进一个数组返回
  //当然，因为这个函数运行较快，也可以扔掉一个
  //return [u*c,v*c];
  return u * c;
}
