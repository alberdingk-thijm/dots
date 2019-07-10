#!/usr/bin/env bash

function run {
    if ! pgrep $1 ;
    then
        $@&
    fi
}

run light-locker
run compton --config ~/.config/compton.conf -b
run syncthing
run mpd ~/.config/mpd/$HOST.conf
run ~/.local/bin/greenclip daemon
