import { Transaction } from '@/models/transactions';

interface Props {
    transaction: Transaction;
}

const Header: React.FC<Props> = ({ transaction }) => {
    return (
        <main className="flex items-center justify-between">
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-md mb-1 font-bold">Rincian Pembayaran</h1>
                    <span className="text-sm">
                        {new Date().toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <span className="text-sm">{transaction?.transaction_code}</span>
            </div>
        </main>
    );
};

export default Header;
