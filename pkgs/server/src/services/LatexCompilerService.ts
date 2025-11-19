import axios from 'axios';

import { LatexTemplateService } from './LatexTemplateService';

export class LatexCompilerService {
  private addr: string;
  private latexTemplateService: LatexTemplateService;

  constructor(addr: string) {
    this.addr = addr;
    this.latexTemplateService = new LatexTemplateService();
  }

  async compile(): Promise<Buffer> {
    const pdf = await axios.post(`${this.addr}/api/v0/compile`, {
      text: this.latexTemplateService.retrieve('default'),
    }, {
      responseType: 'arraybuffer'
    });

    return pdf.data;
  }
}
