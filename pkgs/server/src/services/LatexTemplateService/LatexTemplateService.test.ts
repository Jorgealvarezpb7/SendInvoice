import { describe, expect, test } from 'vitest';

import { LatexTemplateService } from '.';
import type { IInvoice } from '../../modules/invoice/entities/Invoice';

describe('LatexTemplateService', () => {
  test('compiles a template', () => {
    const service = new LatexTemplateService();
    const fakeInvoice: IInvoice = {
      id: '0000-0000-0000-0000',
      invoiceNumber: 'INV-1001',
      subtotal: 1000,
      tax: 100,
      total: 1100,
      date: new Date('2024-01-01'),
      dueDate: new Date('2024-01-15'),
      notes: 'Thank you for your business!',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      // billToAddress: Address;
      // shipToAddress: Address;
      // user: User;
      items: [
        {
          id: '1111-1111-1111-1111',
          amount: 1000,
          description: 'Web development services',
          quantity: 1,
          unitPrice: 1000,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ]
      // company: Company;
      // recipient: Recipient;
      // deletedAt?: Date;
    };

    const latex = service.build('simple', fakeInvoice);

    expect(latex).toContain('\\documentclass');
    expect(latex).toContain('INV-1001');
    expect(latex).toContain('Web development services');
  });
});
