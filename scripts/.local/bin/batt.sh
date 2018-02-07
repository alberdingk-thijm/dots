#!/usr/bin/bash

#
# ~/bin/batt.sh
#

# notify battery status

if [ -d /sys/class/power_supply/BAT* ]; then
    charging=`head -n 1 /sys/class/power_supply/BAT*/status`
    if [ $charging == "Discharging" ]; then
        bat_lvl=`head -n 1 /sys/class/power_supply/BAT*/capacity`
        case $bat_lvl in
            [0-9] | 1[0-4])
                 bat="   $bat_lvl% "
                ;;
            1[5-9] | 2[0-9])
                bat="   $bat_lvl% "
                ;;
            3[0-9] | 4[0-9] | 5[0-9])
                bat="   $bat_lvl% "
                ;;
            6[0-9] | 7[0-9] | 8[0-9])
                bat="   $bat_lvl% "
                ;;
            9[0-9])
                bat="   $bat_lvl% "
                ;;
        esac
    else
        bat="   100% "
    fi
fi

# pass to notify-send instead of echo
# if argument is given
if [[ ($# > 0) && ($1 = "--notify" || $1 = "-n") ]]; then
    notify-send "${bat}"
else
    echo "${bat}"
fi
