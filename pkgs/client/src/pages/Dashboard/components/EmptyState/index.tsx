import { Link } from 'react-router-dom';
import './EmptyState.css';

export default function EmptyState() {
    return (
        <div className="dashboard-content-area">
            <h1 className="dashboard-title">Welcome to Send Invoice</h1>
            <h2 className="dashboard-subtitle">Simplify your billing process.</h2>
            <h3 className="dashboard-subtitle2">
                Easily create, manage, and send professional invoices to your clients in just a few clicks.
            </h3>
            <div className="onboarding">
                <h3 className="onboarding-title">Getting started</h3>
                <p className="onboarding-text">
                    Set up your workspace in a few steps:
                </p>

                <ul className="onboarding-steps">
                    <li>
                        <strong>Sender</strong> — Add your business or personal details.
                    </li>
                    <li>
                        <strong>Recipient</strong> — Add your client’s information.
                    </li>
                    <li>
                        <strong>Invoice</strong> — Click <em>Create your first Invoice</em> and start billing.
                    </li>
                </ul>
            </div>
            <Link className='dashboard-link' to='/invoice' style={{ textDecoration: 'none' }}>
                <h3>Create your first Invoice</h3>
            </Link>
        </div>
    );
}