# Makefile

.PHONY: 2 3 5 6 8 10 11 all

all: 2 3 6 8 10 11

2:
	@./steps/2.sh

3:
	@./steps/3.sh

5:
	xdg-open 'http://localhost:4000/' 2>/dev/null || open 'http://localhost:4000/'

6:
	@./steps/6.sh

8:
	@./steps/8.sh

10:
	@./steps/10.sh

11:
	@./steps/11.sh
