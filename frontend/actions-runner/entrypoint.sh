#!/bin/bash

./config.sh --unattended --url $REPO_URL --token $RUNNER_TOKEN --name $RUNNER_NAME --work _work --replace

./run.sh & wait $!

