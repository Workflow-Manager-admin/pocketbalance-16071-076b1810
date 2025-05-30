#!/bin/bash
cd /home/kavia/workspace/code-generation/pocketbalance-16071-076b1810/pocketbalance
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

