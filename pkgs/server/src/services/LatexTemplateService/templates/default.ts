export const DEFAULT_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            padding: 40px 20px;
        }

        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 50px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #2c3e50;
        }

        .logo {
            width: 150px;
            height: 60px;
            background-color: #3498db;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
        }

        .company-info {
            text-align: right;
        }

        .company-info h1 {
            color: #2c3e50;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .company-info p {
            color: #7f8c8d;
            line-height: 1.6;
        }

        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .bill-to, .invoice-info {
            flex: 1;
        }

        .bill-to h3, .invoice-info h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .bill-to p, .invoice-info p {
            color: #555;
            line-height: 1.8;
        }

        .invoice-info {
            text-align: right;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        thead {
            background-color: #2c3e50;
            color: white;
        }

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }

        th.text-right {
            text-align: right;
        }

        td {
            padding: 15px;
            border-bottom: 1px solid #ecf0f1;
            color: #555;
        }

        td.text-right {
            text-align: right;
        }

        tbody tr:hover {
            background-color: #f8f9fa;
        }

        .totals {
            margin-left: auto;
            width: 300px;
        }

        .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            color: #555;
        }

        .totals-row.subtotal {
            border-top: 2px solid #ecf0f1;
            padding-top: 15px;
        }

        .totals-row.total {
            border-top: 3px solid #2c3e50;
            padding-top: 15px;
            margin-top: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
        }

        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #ecf0f1;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo">LOGO</div>
            <div class="company-info">
                <h1>INVOICE</h1>
                <p>Acme Corporation</p>
                <p>123 Business Street</p>
                <p>New York, NY 10001</p>
                <p>contact@acmecorp.com</p>
            </div>
        </div>

        <div class="invoice-details">
            <div class="bill-to">
                <h3>Bill To</h3>
                <p><strong>John Smith</strong></p>
                <p>456 Client Avenue</p>
                <p>Los Angeles, CA 90001</p>
                <p>john.smith@email.com</p>
            </div>
            <div class="invoice-info">
                <h3>Invoice Details</h3>
                <p><strong>Invoice #:</strong>{{invoice_number}}</p>
                <p><strong>Date:</strong>{{invoice_date}}</p>
                <p><strong>Due Date:</strong>{{invoice_due_date}}</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Website Design Services</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$2,500.00</td>
                    <td class="text-right">$2,500.00</td>
                </tr>
                <tr>
                    <td>Logo Design</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$800.00</td>
                    <td class="text-right">$800.00</td>
                </tr>
                <tr>
                    <td>Content Management System Setup</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$1,200.00</td>
                    <td class="text-right">$1,200.00</td>
                </tr>
                <tr>
                    <td>SEO Optimization Package</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$950.00</td>
                    <td class="text-right">$950.00</td>
                </tr>
                <tr>
                    <td>Responsive Mobile Design</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$1,500.00</td>
                    <td class="text-right">$1,500.00</td>
                </tr>
                <tr>
                    <td>E-commerce Integration</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$2,200.00</td>
                    <td class="text-right">$2,200.00</td>
                </tr>
                <tr>
                    <td>Social Media Integration</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$400.00</td>
                    <td class="text-right">$400.00</td>
                </tr>
                <tr>
                    <td>Contact Form Development</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$300.00</td>
                    <td class="text-right">$300.00</td>
                </tr>
                <tr>
                    <td>Website Hosting (Annual)</td>
                    <td class="text-right">1</td>
                    <td class="text-right">$250.00</td>
                    <td class="text-right">$250.00</td>
                </tr>
                <tr>
                    <td>Training & Documentation</td>
                    <td class="text-right">5</td>
                    <td class="text-right">$150.00</td>
                    <td class="text-right">$750.00</td>
                </tr>
            </tbody>
        </table>

        <div class="totals">
            <div class="totals-row subtotal">
                <span>Subtotal:</span>
                <span>$10,850.00</span>
            </div>
            <div class="totals-row">
                <span>Tax (8.5%):</span>
                <span>$922.25</span>
            </div>
            <div class="totals-row total">
                <span>Total:</span>
                <span>$11,772.25</span>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your business!</p>
            <p>Please make payment within 30 days. For questions, contact us at billing@acmecorp.com</p>
        </div>
    </div>
</body>
</html>`;