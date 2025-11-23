export const LATEX_SIMPLE_TEMPLATE = `\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{tabularx}
\\usepackage{booktabs}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{array}
\\usepackage{xcolor}

% Header and footer setup
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0.5pt}
\\fancyfoot[C]{Page \\thepage\\ of \\pageref{LastPage}}

% Custom commands
\\newcommand{\\invoiceline}[4]{#1 & #2 & #3 & #4 \\\\}

\\begin{document}

% Header section
\\begin{minipage}[t]{0.6\\textwidth}
  \\textbf{\\LARGE {{COMPANY_NAME}}} \\\\[0.3cm]
  {{COMPANY_ADDRESS}} \\\\
  {{COMPANY_CITY_STATE_ZIP}} \\\\
  {{COMPANY_PHONE}} \\\\
  {{COMPANY_EMAIL}}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.35\\textwidth}
  \\raggedleft
  \\textbf{\\huge INVOICE} \\\\[0.5cm]
  \\textbf{Invoice \\#:} {{INVOICE_NUMBER}} \\\\
  \\textbf{Date:} {{INVOICE_DATE}} \\\\
  \\textbf{Due Date:} {{DUE_DATE}}
\\end{minipage}

\\vspace{1cm}

% Client information
\\textbf{Bill To:} \\\\[0.3cm]
\\begin{tabular}{l}
  \\textbf{{{CLIENT_NAME}}} \\\\
  {{CLIENT_ADDRESS}} \\\\
  {{CLIENT_CITY_STATE_ZIP}} \\\\
  {{CLIENT_EMAIL}}
\\end{tabular}

\\vspace{1cm}

% Invoice items table
\\begin{tabularx}{\\textwidth}{|l|c|c|X|}
\\hline
\\textbf{Description} & \\textbf{Qty} & \\textbf{Unit Price} & \\textbf{Total} \\\\
\\hline
{{INVOICE_ITEMS}}
\\hline
\\end{tabularx}

\\vspace{0.5cm}

% Totals section
\\begin{flushright}
\\begin{tabular}{lr}
  \\textbf{Subtotal:} & {{SUBTOTAL}} \\\\
  \\textbf{Tax ({{TAX_RATE}}):} & {{TAX_AMOUNT}} \\\\
  \\hline
  \\textbf{\\large Total:} & \\textbf{\\large {{TOTAL}}} \\\\
\\end{tabular}
\\end{flushright}

\\vspace{1cm}

% Notes and terms
\\ifx{{NOTES}}\\empty
\\else
\\textbf{Notes:} \\\\
{{NOTES}}
\\vspace{0.5cm}
\\fi

\\ifx{{TERMS}}\\empty
\\else
\\textbf{Terms \\& Conditions:} \\\\
{{TERMS}}
\\fi

\\end{document}`;
