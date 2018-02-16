#!/bin/bash

#
# ~/bin/networkstatus.sh
#

# echo network status

if [ -d /sys/class/net/e* ]; then
	[ `head -n 1 /sys/class/net/e*/carrier` -eq 1 ] && net="   Ethernet "
fi

if [ -d /sys/class/net/w* ]; then
	net="   `awk 'NR == 3 { print substr($3, 1, length($3) - 1) }' /proc/net/wireless`% "
fi

echo "${net}"
