export const LATEX_DEFAULT_TEMPLATE = `\\documentclass[12pt]{article}
\\usepackage[a4paper, margin=1in]{geometry}
\\usepackage{graphicx}
\\usepackage{array}
\\usepackage{pgffor}
\\usepackage{xfp}
\\usepackage{etoolbox}

% Company Information Variables
\\newcommand{\\companyname}{Name}
\\newcommand{\\companyemail}{name@gmail.com}

% Client ID
\\newcommand{\\invoiceto}{Company}
\\newcommand{\\invoicedatestart}{09/16/2025}
\\newcommand{\\invoicedateend}{10/15/2025}
\\newcommand{\\invoiceid}{001}

\\makeatletter
% Initialize project list
\\def\\projectlist{}
\\def\\grandtotal{0}
\\newcommand{\\addprojecttolist}[1]{%
    \\xifinlist{#1}{\\projectlist}{}{%
        \\listgadd{\\projectlist}{#1}%
    }%
}
% Define work item
\\newcommand{\\definework}[4]{%
    \\addprojecttolist{#1}%
    \\@ifundefined{proj:#1}{%
        \\expandafter\\def\\csname proj:#1\\endcsname{}%
        \\expandafter\\def\\csname projtotal:#1\\endcsname{0}%
    }{}%
    \\expandafter\\g@addto@macro\\csname proj:#1\\endcsname{%
        #2 & #3 & #4 & \\fpeval{#3 * #4} \\\\
    }%
    \\expandafter\\xdef\\csname projtotal:#1\\endcsname{\\fpeval{\\csname projtotal:#1\\endcsname + (#3 * #4)}}%
    \\xdef\\grandtotal{\\fpeval{\\grandtotal + (#3 * #4)}}%
}

% Define expense item
\\newcommand{\\defineexpense}[3]{%
    \\addprojecttolist{#1}%
    \\@ifundefined{proj:#1}{%
        \\expandafter\\def\\csname proj:#1\\endcsname{}%
        \\expandafter\\def\\csname projtotal:#1\\endcsname{0}%
    }{}%
    \\expandafter\\g@addto@macro\\csname proj:#1\\endcsname{%
        #2 & {---} & {---} & #3 \\\\
    }%
    \\expandafter\\xdef\\csname projtotal:#1\\endcsname{\\fpeval{\\csname projtotal:#1\\endcsname + #3}}%
    \\xdef\\grandtotal{\\fpeval{\\grandtotal + #3}}%
}
\\makeatother  % Reset @ handling

% Display a single project
\\newcommand{\\displayproject}[1]{%
    \\noindent
    \\begin{tabular}{|p{7.5cm}|p{2cm}|p{2cm}|p{2.5cm}|}
        \\hline
        \\textbf{Description} & \\textbf{Units} & \\textbf{Rate (\\$)} & \\textbf{Amount (\\$)} \\\\
        \\hline
        \\csname proj:#1\\endcsname
        \\hline
        \\multicolumn{3}{|l|}{\\textbf{Total}} & \\csname projtotal:#1\\endcsname \\\\ \\hline
    \\end{tabular}
    \\vspace{1cm}
}

% Define the list processor
\\newcommand{\\processprojects}[1]{%
    \\displayproject{#1}%
}

\\begin{document}

% Define Lines
\\definework{Contract Work}{Concept}{1}{10.60}

% \\definework{Contract Work}{Negative Entry}{1}{-118.34}

% Logo and header
\\begin{center}
    {\\Large\\bfseries \\companyname}\\\\
    {\\small \\companyemail}\\\\
\\end{center}

\\vspace{0.5cm}
\\hrule
\\vspace{0.5cm}

% Invoice Info
\\noindent{\\textbf{Invoice To:}} \\invoiceto\\\\
\\noindent{\\textbf{Invoice Number:}} \\#\\invoiceid\\\\
{\\textbf{Invoice Period:}} \\invoicedatestart - \\invoicedateend\\\\

% Display projects
\\forlistloop{\\processprojects}{\\projectlist}

\\noindent{\\textbf{Grand Total:}} \\$\\fpeval{\\grandtotal}

% Footer
\\begin{center}
    {\\textit{\\companyname}}
\\end{center}

\\end{document}`;