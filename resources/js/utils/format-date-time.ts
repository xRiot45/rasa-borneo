export function formatDateIndo(dateInput: string | Date): string {
    const date = new Date(dateInput);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function formatTimeAmPm(dateInput: string | Date): string {
    const date = new Date(dateInput);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

// Jika ingin fungsi gabungan
export function formatDateTimeIndo(dateInput: string | Date): { date: string; time: string } {
    return {
        date: formatDateIndo(dateInput),
        time: formatTimeAmPm(dateInput),
    };
}
