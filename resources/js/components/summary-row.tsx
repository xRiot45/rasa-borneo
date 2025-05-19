interface SummaryRowProps {
    label: string;
    value: string;
    isBold?: boolean;
    className?: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, isBold = false, className }) => {
    return (
        <div className={`flex justify-between ${isBold ? 'font-bold' : ''}`}>
            <span>{label}</span>
            <span className={`${className} font-bold`}>{value}</span>
        </div>
    );
};

export default SummaryRow;
