// 格式化金额,给金额加逗号
export const formatMoney = val => {
    val = (val - 0).toFixed(2);
    return val.replace(/\B(?=(\d{3})+\b)/, ',').replace(/^/, '$$ ');
};
