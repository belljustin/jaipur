#! /bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SERVERDIR="$DIR/../src/server/"
node $SERVERDIR/index.js
