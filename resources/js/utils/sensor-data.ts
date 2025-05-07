export function censorImportantData(text: string, isImportant: boolean): string {
    if (!text) return '-';

    if (!isImportant) return text;

    // Menyensor data penting dengan mengganti sebagian karakter dengan ***
    const lengthToShow = Math.floor(text.length / 4); // Tampilkan sebagian kecil karakter depan
    const censoredPart = '*'.repeat(text.length - lengthToShow); // Bagian yang disensor
    const visiblePart = text.slice(0, lengthToShow); // Bagian yang terlihat

    return `${visiblePart}${censoredPart}`;
}
