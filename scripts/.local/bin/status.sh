#!/usr/bin/env sh

#
# ~/Documents/cs/scripts/wm/status.sh
#

# mpd status

mpd=" `~/Documents/cs/scripts/wm/mpd.sh get`     "

# Battery level

if [ -d /sys/class/power_supply/BAT* ]; then
	 bat_lvl=`head -n 1 /sys/class/power_supply/BAT*/capacity`
	 case $bat_lvl in
		[0-9] | 1[0-4])
		 	bat="   $bat_lvl%     "
			;;
		1[5-9] | 2[0-9])
		 	bat="   $bat_lvl%     "
			;;
		3[0-9] | 4[0-9] | 5[0-9])
		 	bat="   $bat_lvl%     "
			;;
		6[0-9] | 7[0-9] | 8[0-9])
		 	bat="   $bat_lvl%     "
			;;
		9[0-9])
		 	bat="   $bat_lvl%     "
			;;
	 esac
fi


# Network status

if [ -d /sys/class/net/e* ]; then
	[ `head -n 1 /sys/class/net/e*/carrier` -eq 1 ] && net="   Ethernet     "
fi

if [ -d /sys/class/net/w* ]; then
	net="   `awk 'NR == 3 { print substr($3, 1, length($3) - 1) }' /proc/net/wireless`%     "
fi


# Volume level

vol=" `~/Documents/cs/scripts/wm/vol.sh get`     "


# CPU usage
#cpu_usg=`vmstat 1 1 | tail -n 1 | awk '{print $15}'`
#cpu="   `echo "100 - $cpu_usg" | bc`%     "


# RAM
ram_active=`grep Active: /proc/meminfo | awk '{print $2}'`
ram="   `free -m | awk 'NR == 2 { printf $3 }'` MB     "

# Date and time

date="   `date '+%G-%m-%d %I:%M %p'`"

id=`cat ~/.cache/osd_id`
if [ $id -gt 0 ]; then
	dunstify -p -r $id -t 3000 "${mpd}${bat}${net}${vol}${cpu}${ram}${date}" > ~/.cache/osd_id
else
	dunstify -p -t 3000 "${mpd}${bat}${net}${vol}${cpu}${ram}${date}" > ~/.cache/osd_id
fi

exit 0