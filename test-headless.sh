#!/bin/bash

set -e

npm install 

ng test --browsers ChromeHeadless --watch=false
