# The node executables to care about
NODE = node
PACKAGE_MANAGER = pnpm

# The folder that Typescript compiles the Javascript into
OUT_DIR = dist

#=============================================================================#
#                  DO NOT CHANGE ANYTHING BELOW THIS LINE
#=============================================================================#

BIN := $(shell $(PACKAGE_MANAGER) bin)

.PHONY: $(OUT_DIR) dev prod run interfaces


$(OUT_DIR):
	tsc --outDir $(OUT_DIR)

interfaces:
	-$(BIN)/ts-node generateInterfaces.ts 2>/dev/null
	@$(RM) src/types/index.ts
	@echo Finished creating interfaces

dev: $(OUT_DIR)
	NODE_ENV=development $(NODE) $(OUT_DIR)/main.js

prod: $(OUT_DIR)
	NODE_ENV=production $(NODE) $(OUT_DIR)/main.js

run:
	NODE_ENV=production $(NODE) $(OUT_DIR)/main.js

rund:
	NODE_ENV=development $(NODE) $(OUT_DIR)/main.js

test:
	@echo "Automated testing is currently disabled due to weird behaviour with the test suite runner that isn't worth debugging right now."
#	TS_NODE_COMPILER_OPTIONS='{"noUnusedLocals": false, "noUnusedParameters": false }' \
#	TESTING="true" \
#	$(BIN)/mocha --require ts-node/register --require tests/main.ts 'tests/**/*.ts'

clean:
	$(RM) -rf dist db.json tsconfig.tsbuildinfo