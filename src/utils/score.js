export const clampScore = (value) => {
    if (value === '' || value == null) return '';

    const toStr = String(value);

    const digits = toStr.replace(/\D/g, '');

    let sign = '';

    if (toStr.includes('-')) {
        sign = '-';
    }

    if (toStr.includes('+')) {
        sign = '';
    }

    if (!digits) {
        return sign;
    }

    const num = Number(digits);
    const clamped = num > 151 ? '151' : digits;

    return sign + clamped;
};
