import { Templates } from './templates';

import type { IInvoice } from '../../modules/invoice/entities/Invoice';
import type { TemplateKey } from './templates';
import type { IInvoiceItem } from '../../modules/invoice/entities/InvoiceItem';

export class LatexTemplateService {
  private templates: typeof Templates;

  constructor() {
    this.templates = Templates;
  }

  retrieve(name: TemplateKey): string | null {
    return this.templates[name] || null;
  }

  build(name: TemplateKey, invoice: IInvoice): string {
    const template = this.retrieve(name);

    if (!template) {
      throw new Error(`Template '${name}' not found`);
    }

    return this.buildInvoice(template, invoice);
  }

  private buildInvoice(template: string, invoice: IInvoice): string {
    let result = template;

    result = this.replaceToken(result, 'INVOICE_NUMBER', invoice.invoiceNumber);
    result = this.replaceToken(result, 'INVOICE_DATE', invoice.date.toDateString());

    if (invoice.company) {
      result = this.replaceToken(result, 'COMPANY_NAME', invoice.company.name);
      // result = this.replaceToken(result, 'COMPANY_ADDRESS', invoice.company.address);
      // result = this.replaceToken(result, 'COMPANY_CITY_STATE_ZIP',
        // `${invoice.company.city}, ${invoice.company.state} ${invoice.company.zipCode}`);
      result = this.replaceToken(result, 'COMPANY_PHONE', invoice.company.phone || '');
      // result = this.replaceToken(result, 'COMPANY_EMAIL', invoice.company.email || '');
    }

    // result = this.replaceToken(result, 'CLIENT_NAME', invoice.client.name);
    // result = this.replaceToken(result, 'CLIENT_ADDRESS', invoice.client.address);
    // result = this.replaceToken(result, 'CLIENT_CITY_STATE_ZIP',
      // `${invoice.client.city}, ${invoice.client.state} ${invoice.client.zipCode}`);
    // result = this.replaceToken(result, 'CLIENT_EMAIL', invoice.client.email || '');

    const itemsLatex = this.generateInvoiceItems(invoice.items);
    result = this.replaceToken(result, 'INVOICE_ITEMS', itemsLatex);

    // Replace totals
    result = this.replaceToken(result, 'SUBTOTAL', this.formatCurrency(invoice.subtotal));
    result = this.replaceToken(result, 'TAX_AMOUNT', this.formatCurrency(invoice.tax || 0));
    // result = this.replaceToken(result, 'TAX_RATE', invoice.taxRate ? `${(invoice.taxRate * 100).toFixed(1)}\\%` : '');
    result = this.replaceToken(result, 'TOTAL', this.formatCurrency(invoice.total));

    // Replace optional fields
    result = this.replaceToken(result, 'NOTES', invoice.notes || '');
    // result = this.replaceToken(result, 'TERMS', invoice.terms || '');

    return result;
  }

  private generateInvoiceItems(items: IInvoiceItem[]): string {
    return items.map(item => {
      return `${this.escapeLatex(item.description)} & ${item.quantity} & ${this.formatCurrency(item.unitPrice)} & ${this.formatCurrency(/* item.total */ 0)} \\\\`;
    }).join('\n    ');
  }

  private replaceToken(text: string, token: string, value: string): string {
    const placeholder = `{{${token}}}`;
    return text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  }

  private formatCurrency(amount: number): string {
    return `\\$${amount.toFixed(2)}`;
  }

  private escapeLatex(text: string): string {
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/[{}]/g, match => `\\${match}`)
      .replace(/[$&%#^_~]/g, match => `\\${match}`)
      .replace(/\n/g, '\\\\');
  }
}
