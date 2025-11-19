import { Templates } from './templates';

import type { InvoiceItem } from '../../../../client/src/services/SendInvoice/Invoice';

export class LatexTemplateService {
  private templates: typeof Templates;

  constructor() {
    this.templates = Templates;
  }

  retrieve(name: 'default'): string | null {
    return this.templates[name] || null;
  }

  build(name: 'default', items: InvoiceItem[]): string {
    throw new Error('ot ipml')
  }
}
