PDF=pdflatex
BIB=bibtex
LATEXOBJS= *.aux *.log *.out *.pdf *.bbl *.blg mainNotes.bib

HEADER=main
SRCS=$(HEADER).tex

.PHONY: all clean

all: main-no-bib

main:
	$(PDF) $(SRCS)
	$(BIB) $(HEADER)
	$(PDF) $(SRCS)
	$(PDF) $(SRCS)

main-no-bib:
	$(PDF) $(SRCS)

clean:
	rm -rf $(LATEXOBJS)
