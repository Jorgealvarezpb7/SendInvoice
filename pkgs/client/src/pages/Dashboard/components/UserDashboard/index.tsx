
import './UserDashboard.css';
import type { Invoice } from '../../../../services/SendInvoice/Invoice';
import { SendInvoiceClient } from '../../../../services/SendInvoice';
import { Table } from '../../../../components/atoms/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEraser, FaPlus, FaSave } from 'react-icons/fa';
import { useToken } from '../../../../hooks/user';
import { useActiveCompany } from '../../../../hooks/company';


type UserDashboardProps = {
    invoices: Invoice[];
};

export default function UserDashboard({ invoices: initialInvoices }: UserDashboardProps) {
    const token = useToken(); 
    const activeCompany = useActiveCompany();
    
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const loadInvoices = async () => {

        if (!token || !activeCompany?.id) {
            setError('Missing authentication or company');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const sendInvoiceClient = new SendInvoiceClient(new URL("http://127.0.0.1:8080"));
            const invoiceList = await sendInvoiceClient.invoice.getInvoices(token, activeCompany.id);

            console.log('Loaded Invoices:', invoiceList);
            setInvoices(invoiceList);

        } catch (error) {
            console.error('Error while fetching invoices:', error);
            setError('Error while loading invoices');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialInvoices.length === 0) {
            loadInvoices();
        }
    }, []);

    const handlePrintInvoice = async (id: string) => {
        if (!window.confirm('Are you sure you want to save this invoice?')) {
            return
        }

        try {
            const sendInvoiceClient = new SendInvoiceClient(new URL("http://127.0.0.1:8080"));
            await sendInvoiceClient.invoice.printInvoice(id);

        } catch (error) {
            console.error('Error saving invoice:', error);
            setError('Error saving invoice');
        }
    }

    const handleDeleteInvoice = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this invoice?')) {
            return
        }

        try {
            setLoading(true);
            const sendInvoiceClient = new SendInvoiceClient(new URL("http://127.0.0.1:8080"));
            await sendInvoiceClient.invoice.deleteInvoice(id);

            setInvoices(prev => prev.filter(invoice => invoice.id !== id));

            console.log('Invoice deleted successfully');
        } catch (error) {
            console.error('Error deleting invoice:', error);
            setError('Error deleting invoice');
        } finally {
            setLoading(false);
        }
    }

    const prepareTableData = () => {
        const headers = ['Number', 'Date', 'Due Date', 'Subtotal', 'Tax', 'Total', 'Notes', 'Save', 'Delete'];

        const data = invoices.map(invoice => ({
            'Number': invoice.invoiceNumber,
            'Date': formatDate(invoice.date),
            'Due Date': formatDate(invoice.dueDate),
            'Subtotal': formatCurrency(invoice.subtotal),
            'Tax': formatCurrency(invoice.tax),
            'Total': formatCurrency(invoice.total),
            'Notes': invoice.notes || 'No notes',
            'Save': (
                <button
                    className="save-button"
                    onClick={() => handlePrintInvoice(invoice.id)}
                >
                    <FaSave />
                    Save
                </button>
            ),
            'Delete': (
                <button
                    className="delete-button"
                    onClick={() => handleDeleteInvoice(invoice.id)}
                >
                    <FaEraser />
                    Delete
                </button>
            )
        }));
        return { headers, data };
    };

    const formatDate = (dateString: string | Date): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const { headers, data } = prepareTableData();

    return (
        <div className="dashboard-content-area">
            <h1 className="dashboard-title">Dashboard</h1>
            <Link className='invoice-link' to='/invoice'>
                <FaPlus /><h3>Create New Invoice</h3>
            </Link>
            <div>
                <h2>Last Invoices</h2>
                {loading ? (
                    <div>
                        <p>Loading invoices...</p>
                    </div>
                ) : invoices.length > 0 ? (
                    <Table
                        headers={headers}
                        data={data}
                        className="invoices-table"
                    />
                ) : (
                    <div>
                        <p>No invoices available</p>
                        <button onClick={loadInvoices}>Load Invoices</button>
                    </div>
                )}
            </div>
        </div>
    );
}