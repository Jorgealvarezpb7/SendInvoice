import axios from 'axios';

export class LatexCompilerService {
  private addr: string;

  constructor(addr: string) {
    this.addr = addr;
  }

  async compile(html: string): Promise<Buffer> {
    const pdf = await axios.post(`${this.addr}/api/v0/print`, {
      html,
    }, {
      responseType: 'arraybuffer'
    });

    return pdf.data;
  }
}
