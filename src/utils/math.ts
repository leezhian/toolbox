/*
 * @Author: kim
 * @Date: 2022-09-18 15:35:54
 * @Description: 加减乘除（解决精度问题）
 */
/**
 * @description: 加法
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @return {number}
 */
export function add(arg1: number, arg2: number) {
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    const cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
 * @description: 减法
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @return {number}
 */
export function sub(arg1: number, arg2: number) {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 * @description: 乘法
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @return {number}
 */
export function mul(arg1: number, arg2: number) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) { }
  try {
    m += s2.split('.')[1].length
  } catch (e) { }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

/**
 * @description: 除法
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @return {number}
 */
export function div(arg1: number, arg2: number) {
  try {
    const [integer1, decimals1] = arg1.toString().split('.')
    const [integer2, decimals2] = arg2.toString().split('.')

    const t1 = decimals1 ? decimals1.length : 0
    const t2 = decimals2 ? decimals2.length : 0

    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  } catch (error) {
    console.error(error)
  }
}
