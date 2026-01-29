import Handlebars from 'handlebars';
import sharp from 'sharp';

import { Templates } from './templates';

import type { IInvoice } from '../../modules/invoice/entities/Invoice';
import type { TemplateKey } from './templates';
export class LatexTemplateService {
  private templates: typeof Templates;

  constructor() {
    this.templates = Templates;
  }

  retrieve(name: TemplateKey): string | null {
    return this.templates[name] || null;
  }

    private async optimizeImage(
    imageBytes: Buffer | undefined,
    maxWidth: number,
    imageName: string
  ): Promise<string | null> {
    if (!imageBytes) return null;

    try {
      const optimized = await sharp(imageBytes)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
      
      console.log(`${imageName} optimizado: ${imageBytes.length} → ${optimized.length} bytes`);
      
      return `data:image/jpeg;base64,${optimized.toString('base64')}`;
    } catch (error) {
      console.error(`Error optimizing ${imageName}:`, error);
      return null;
    }
  }

  async build(name: TemplateKey, invoice: IInvoice): Promise<string>  {
    const template = this.retrieve(name);

    if (!template) {
      throw new Error(`Template '${name}' not found`);
    }

    const subtotal = invoice.subtotal.toFixed(2);
    const tax = invoice.tax.toFixed(2);
    const total = invoice.total.toFixed(2);

    const companyLogo = await this.optimizeImage(invoice.company?.logo?.bytes, 300, 'Logo');
    const companySignature = await this.optimizeImage(invoice.company?.signature?.bytes, 400, 'Signature');

    const hbsBuilder = Handlebars.compile(template);
    const html = hbsBuilder({
      invoice_date: invoice.date.toDateString(),
      invoice_number: invoice.invoiceNumber,
      invoice_due_date: invoice.dueDate.toDateString(),

      subtotal: subtotal,
      tax: tax,
      total: total,
    
      notes: invoice.notes,
    
      company_name: invoice.company?.name || '',
      company_phone: invoice.company?.phone || '',
      company_street1: invoice.company?.address?.streetAddress1 || '',
      company_street2: invoice.company?.address?.streetAddress2 || '',
      company_city: invoice.company?.address?.city || '',
      company_city_area: invoice.company?.address?.cityArea || '',
      company_postal_code: invoice.company?.address?.postalCode || '',
      company_country: invoice.company?.address?.country || '',
      company_logo: companyLogo,          
      company_signature: companySignature,
  
      recipient_name: invoice.recipient?.recipientName || '',
      recipient_phone: invoice.recipient?.phone || '',
      recipient_email: invoice.recipient?.email || '',
      recipient_street1: invoice.billToAddress?.streetAddress1 || '',
      recipient_street2: invoice.billToAddress?.streetAddress2 || '',
      recipient_city: invoice.billToAddress?.city || '',
      recipient_city_area: invoice.billToAddress?.cityArea || '',
      recipient_postal_code: invoice.billToAddress?.postalCode || '',
      recipient_country: invoice.billToAddress?.country || '',
    
      items: invoice.items?.map(item => {
        const unitPrice = item.unitPrice.toFixed(2);
        const amount = item.amount.toFixed(2);
      
        return {
          description: item.description,
          quantity: item.quantity,
          unit_price: unitPrice,
          amount: amount
          };
        }) || []
      });

    return html;
  }
}
