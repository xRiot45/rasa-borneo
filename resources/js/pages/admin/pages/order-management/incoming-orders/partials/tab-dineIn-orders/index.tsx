import { Order } from '@/models/order';
import IncomingOrdersTable from '../../shared/table';
import { columns } from '../../shared/table/columns';

interface Props {
    data: Order[];
}

const TabDineInOrderContent: React.FC<Props> = ({ data }) => {
    return (
        <>
            <IncomingOrdersTable data={data} columns={columns} />
        </>
    );
};

export default TabDineInOrderContent;
