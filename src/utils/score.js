export const clampScore = (value) => {
    if (value === '' || value == null) return '';

    let cleaned = String(value);

    const hasPlus = cleaned.includes('+');
    const hasMinus = cleaned.includes('-');

    const digitsOnly = cleaned.replace(/\D/g, '');

    if (!digitsOnly) return hasMinus ? '-' : '';

    const num = Number(digitsOnly);
    const clamped = num > 151 ? '151' : digitsOnly;

    if (hasPlus) return clamped;
    if (hasMinus) return '-' + clamped;

    return clamped;
};
