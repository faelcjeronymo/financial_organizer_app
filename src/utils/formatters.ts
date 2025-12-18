/**
 * Formats a numeric string or number into a BRL currency string.
 * e.g., "1234.56" becomes "R$ 1.234,56"
 * @param amount The amount to format.
 */
export const formatCurrency = (amount: string | number): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
        return "R$ 0,00";
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numericAmount);
};

/**
 * Formats an ISO date string (e.g., "2025-11-25") into a DD/MM/YYYY format.
 * @param dateString The date string to format.
 */
export const formatDate = (dateString: string | null): string => {
    if (!dateString) {
        return '-';
    }
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};