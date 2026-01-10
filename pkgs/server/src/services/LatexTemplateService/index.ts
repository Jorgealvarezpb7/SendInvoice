import Handlebars from 'handlebars';

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

    const hbsBuilder = Handlebars.compile(template);
    const html = hbsBuilder({
      invoice_date: invoice.date.toDateString(),
      invoice_number: invoice.invoiceNumber,
      invoice_due_date: invoice.dueDate.toDateString(),
    });

    return html;
  }
}
