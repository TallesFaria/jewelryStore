const formatNumber = (input) => {
    let number = input;
    if (!number) return number;
    number = number.replace(/[^0-9]+/g, '');
    if (number.length > 2) {
        number = `${number.substring(0, number.length - 2)}.${number.substring(number.length - 2)}`;
    }
    return number;
};

export default formatNumber;
