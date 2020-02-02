#!/usr/bin/env bash

function run {
    if ! pgrep -f "$1" ;
    then
        $@&
    fi
}

run picom --daemon
run xss-lock -n /usr/lib/xsecurelock/dimmer -l -- xsecurelock
run syncthing
run pcmanfm -d
run nm-applet
run blueman-applet
