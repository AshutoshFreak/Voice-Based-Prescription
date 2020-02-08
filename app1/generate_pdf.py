import os

from app1.send import send


def generate(content):
    f = open('a.tex', 'w')
    text = '''\\documentclass{article}

    \\begin{document}

    \\title{IIT Bhilai Hospital}
    \\author{Dr. John Doe}

    \\maketitle
    '''

    for i in content:
        text += '\\section*{' + i + '}\n' + content[i] + '\n'
    text += '\\end{document}\n'

    f.write(text)
    f.close()
    os.system("pdflatex a.tex")
    send()
