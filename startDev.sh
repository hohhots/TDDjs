#!/bin/bash

export JSTESTDRIVER_HOME=$PWD/tools/jsTestDriver

jstestdriver --port 9876 --browser firefox,chromium-browser,/opt/google/chrome/chrome &

jsautotest
