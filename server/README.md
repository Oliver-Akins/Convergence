This is the server code for Convergence, the scripts to run the server are all
within the `makefile`. Before running any of the `make` recipes, the dependencies
must be installed through `pnpm` using the command `pnpm install`. The most
important make recipe to know for development purposes is `make dev`, which will
start the API in development mode after compiling all of the changes, if you do
not want it to re-compile the changes `make rund` can be used which will use the
existing compilation to run the server.