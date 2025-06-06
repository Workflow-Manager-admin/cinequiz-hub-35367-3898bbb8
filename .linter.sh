#!/bin/bash
cd /home/kavia/workspace/code-generation/cinequiz-hub-35367-3898bbb8/cinequiz_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

