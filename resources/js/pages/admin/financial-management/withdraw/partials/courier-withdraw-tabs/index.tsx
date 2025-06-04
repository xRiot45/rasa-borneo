import { Withdraw } from '@/models/financial-management/withdraw';
import WithdrawTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    data: Withdraw[];
}

const CourierWithdrawTab: React.FC<Props> = ({ data }) => {
    return (
        <>
            <WithdrawTable data={data} columns={columns} />
        </>
    );
};

export default CourierWithdrawTab;
