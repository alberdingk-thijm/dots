-- Algonquin widgets

local gears = require("gears")
-- local lain  = require("lain")
local awful = require("awful")
local wibox = require("wibox")
local string, os = string, os

local theme = {}

-- Clock
local mytextclock = wibox.widget.textclock(markup("#FFFFFF", space3 .. "%H:%M   " .. markup.font("Roboto 4", " ")))
mytextclock.font = theme.font
local clock_icon = wibox.widget.imagebox(theme.clock)
local clockbg = wibox.container.background(mytextclock, theme.bg_focus, gears.shape.rectangle)
local clockwidget = wibox.container.margin(clockbg, 0, 3, 5, 5)

-- Calendar
-- local mytextcalendar = wibox.widget.textclock(markup.fontfg(theme.font, "#FFFFFF", space3 .. "%d %b " .. markup.font("Roboto 5", " ")))
-- local calendar_icon = wibox.widget.imagebox(theme.calendar)
-- local calbg = wibox.container.background(mytextcalendar, theme.bg_focus, gears.shape.rectangle)
-- local calendarwidget = wibox.container.margin(calbg, 0, 0, 5, 5)
-- theme.cal = lain.widget.cal({
--     attach_to = { mytextclock, mytextcalendar },
--     notification_preset = {
--         fg = "#FFFFFF",
--         bg = theme.bg_normal,
--         position = "bottom_right",
--         font = "Monospace 10"
--     }
-- })

-- MPD
-- local mpd_icon = awful.widget.launcher({ image = theme.mpdl, command = theme.musicplr })
-- local prev_icon = wibox.widget.imagebox(theme.prev)
-- local next_icon = wibox.widget.imagebox(theme.nex)
-- local stop_icon = wibox.widget.imagebox(theme.stop)
-- local pause_icon = wibox.widget.imagebox(theme.pause)
-- local play_pause_icon = wibox.widget.imagebox(theme.play)
-- theme.mpd = lain.widget.mpd({
--     settings = function ()
--         if mpd_now.state == "play" then
--             mpd_now.artist = mpd_now.artist:upper():gsub("&.-;", string.lower)
--             mpd_now.title = mpd_now.title:upper():gsub("&.-;", string.lower)
--             widget:set_markup(markup.font("Roboto 4", " ")
--                               .. markup.font(theme.taglist_font,
--                               " " .. mpd_now.artist
--                               .. " - " ..
--                               mpd_now.title .. "  ") .. markup.font("Roboto 5", " "))
--             play_pause_icon:set_image(theme.pause)
--         elseif mpd_now.state == "pause" then
--             widget:set_markup(markup.font("Roboto 4", " ") ..
--                               markup.font(theme.taglist_font, " MPD PAUSED  ") ..
--                               markup.font("Roboto 5", " "))
--             play_pause_icon:set_image(theme.play)
--         else
--             widget:set_markup("")
--             play_pause_icon:set_image(theme.play)
--         end
--     end
-- })
-- local musicbg = wibox.container.background(theme.mpd.widget, theme.bg_focus, gears.shape.rectangle)
-- local musicwidget = wibox.container.margin(musicbg, 0, 0, 5, 5)

-- musicwidget:buttons(my_table.join(awful.button({ }, 1,
-- function () awful.spawn(theme.musicplr) end)))
-- prev_icon:buttons(my_table.join(awful.button({}, 1,
-- function ()
--     os.execute("mpc prev")
--     theme.mpd.update()
-- end)))
-- next_icon:buttons(my_table.join(awful.button({}, 1,
-- function ()
--     os.execute("mpc next")
--     theme.mpd.update()
-- end)))
-- stop_icon:buttons(my_table.join(awful.button({}, 1,
-- function ()
--     play_pause_icon:set_image(theme.play)
--     os.execute("mpc stop")
--     theme.mpd.update()
-- end)))
-- play_pause_icon:buttons(my_table.join(awful.button({}, 1,
-- function ()
--     os.execute("mpc toggle")
--     theme.mpd.update()
-- end)))

-- ALSA volume bar
--theme.volume = lain.widget.alsabar({
--    notification_preset = { font = "Monospace 9"},
--    --togglechannel = "IEC958,3",
--    width = 80, height = 10, border_width = 0,
--    colors = {
--        background = "#383838",
--        unmute     = "#80CCE6",
--        mute       = "#FF9F9F"
--    },
--})
--theme.volume.bar.paddings = 0
--theme.volume.bar.margins = 5
--local volumewidget = wibox.container.background(theme.volume.bar, theme.bg_focus, gears.shape.rectangle)
--volumewidget = wibox.container.margin(volumewidget, 0, 0, 5, 5)

-- Net
-- local netdown_icon = wibox.widget.imagebox(theme.net_down)
-- local netup_icon = wibox.widget.imagebox(theme.net_up)
-- local net = lain.widget.net({
--     settings = function()
--         widget:set_markup(markup.font("Roboto 1", " ") .. markup.font(theme.font, net_now.received .. " - "
--                           .. net_now.sent) .. markup.font("Roboto 2", " "))
--     end
-- })
-- local netbg = wibox.container.background(net.widget, theme.bg_focus, gears.shape.rectangle)
-- local networkwidget = wibox.container.margin(netbg, 0, 0, 5, 5)

-- Weather
-- theme.weather = lain.widget.weather({
--     city_id = 2643743, -- placeholder (London)
--     notification_preset = { font = "Monospace 9", position = "bottom_right" },
-- })

-- Separators
local first = wibox.widget.textbox('<span font="Roboto 7"> </span>')
local spr_small = wibox.widget.imagebox(theme.spr_small)
local spr_very_small = wibox.widget.imagebox(theme.spr_very_small)
local spr_right = wibox.widget.imagebox(theme.spr_right)
local spr_bottom_right = wibox.widget.imagebox(theme.spr_bottom_right)
local spr_left = wibox.widget.imagebox(theme.spr_left)
local bar = wibox.widget.imagebox(theme.bar)
local bottom_bar = wibox.widget.imagebox(theme.bottom_bar)

local barcolor  = gears.color({
    type  = "linear",
    from  = { 32, 0 },
    to    = { 32, 32 },
    stops = { {0, theme.bg_focus}, {0.25, "#505050"}, {1, theme.bg_focus} }
})
