#!/bin/bash

./config.sh --url "$REPO_URL" --token "$RUNNER_TOKEN" --name "$RUNNER_NAME" --unattended --replace
./run.sh



