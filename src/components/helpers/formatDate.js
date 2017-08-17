const formatDate = (input) => {
    let date = input;
    if (!date) return date;
    date = date.replace(/[^0-9]+/g, '');
    if (date.length > 2) {
        date = `${date.substring(0, 2)}/${date.substring(2)}`;
    }
    if (date.length > 5) {
        date = `${date.substring(0, 5)}/${date.substring(5, 9)}`;
    }
    return date;
};

export default formatDate;
