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
            font-size: 12px;
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
            width: 180px;        
            height: 72px;   
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
            font-size: 20px;
            margin-bottom: 10px;
            font-size: 14px; 
        }

        .company-info p {
            color: #7f8c8d;
            line-height: 1.6;
            font-size: 12px; 
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
            font-size: 12px; 
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
            font-size: 12px;
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
            font-size: 12px;
        }

        .totals-row.subtotal {
            border-top: 2px solid #ecf0f1;
            padding-top: 15px;
        }

        .totals-row.total {
            border-top: 3px solid #2c3e50;
            padding-top: 15px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #ecf0f1;
            page-break-inside: avoid;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            page-break-inside: avoid;
        }

        .footer-notes {
            border: 2px solid #2c3e50;
            border-radius: 4px;
            padding: 10px;
            min-height: 80px;
            page-break-inside: avoid;
        }

        .footer-notes h4 {
            font-size: 10px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            text-align: center;
        }

        .footer-notes p {
            color: #555;
            line-height: 1.4;
            font-size: 9px;
        }

        .signature {
            border: 2px solid #2c3e50;
            border-radius: 4px;
            padding: 10px;
            text-align: center;
            min-height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-inside: avoid;
        }

        .signature h4 {
            font-size: 10px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .signature img {
            max-width: 100px;
            max-height: 40px;
            margin: 0 auto;
            object-fit: contain;
        }

        .signature-line {
            margin-top: 5px;
            padding-top: 5px;
            border-top: 2px solid #2c3e50;
            color: #555;
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo">
                {{#if company_logo}}
                    <img src="{{company_logo}}" alt="Company Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                {{else}}
                    LOGO
                {{/if}}
            </div>
            <div class="company-info">
                <h1>INVOICE</h1>
                <p><strong>{{company_name}}</strong></p>
                <p>{{company_street1}}</p>
                {{#if company_street2}}<p>{{company_street2}}</p>{{/if}}
                <p>{{company_city}}{{#if company_city_area}}, {{company_city_area}}{{/if}} {{company_postal_code}}</p>
                <p>{{company_country}}</p>
                <p>{{company_phone}}</p>
            </div>
        </div>

        <div class="invoice-details">
            <div class="bill-to">
                <h3>Bill To</h3>
                <p><strong>{{recipient_name}}</strong></p>
                <p>{{recipient_street1}}</p>
                {{#if recipient_street2}}<p>{{recipient_street2}}</p>{{/if}}
                <p>{{recipient_city}}{{#if recipient_city_area}}, {{recipient_city_area}}{{/if}} {{recipient_postal_code}}</p>
                <p>{{recipient_country}}</p>
                <p>{{recipient_email}}</p>
                <p>{{recipient_phone}}</p>
            </div>
            <div class="invoice-info">
                <h3>Invoice Details</h3>
                <p><strong>Invoice #:</strong> {{invoice_number}}</p>
                <p><strong>Date:</strong> {{invoice_date}}</p>
                <p><strong>Due Date:</strong> {{invoice_due_date}}</p>
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
                {{#each items}}
                <tr>
                    <td>{{description}}</td>
                    <td class="text-right">{{quantity}}</td>
                    <td class="text-right">\${{unit_price}}</td>
                    <td class="text-right">\${{amount}}</td>
                </tr>
                {{/each}}
            </tbody>
        </table>

        <div class="totals">
            <div class="totals-row subtotal">
                <span>Subtotal:</span>
                <span>\${{subtotal}}</span>
            </div>
            <div class="totals-row">
                <span>Tax:</span>
                <span>\${{tax}}</span>
            </div>
            <div class="totals-row total">
                <span>Total:</span>
                <span>\${{total}}</span>
            </div>
        </div>

        <div class="footer">
            <div class="footer-content">
                {{#if notes}}
                <div class="footer-notes">
                    <h4>NOTE</h4>
                    <p>{{notes}}</p>
                </div>
                {{/if}}
                
                {{#if company_signature}}
                <div class="signature">
                    <h4>SIGNATURE</h4>
                    <img src="{{company_signature}}" alt="Signature">
                    <div class="signature-line">
                        Authorized Signature
                    </div>
                </div>
                {{/if}}
            </div>
        </div>
    </div>
</body>
</html>`;