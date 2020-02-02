-- Logout menu popup
local gears = require("gears")
local awful = require("awful")
local beautiful = require("beautiful")
local wibox = require("wibox")

logoutmenu = {
    { "logout", function() awesome.quit() end },
    { "shutdown", function() awful.spawn.with_shell("sudo shutdown -h now") end },
    { "reboot", function() awful.spawn.with_shell("sudo shutdown -r now") end }
}

local logout = awful.popup {
    -- Each widget launches some logout command
    widget = {
        -- Logout
        {
            widget = awful.widget.launcher({ 
                image = beautiful.logout_icon,
                command = awesome.quit 
            }),
        },
        -- Shutdown
        {
            widget = awful.widget.launcher({
                image = beautiful.shutdown_icon,
                command = function () awful.spawn.with_shell("sudo shutdown -h now") end,
            }),
        },
        -- Reboot
        {
            widget = awful.widget.launcher({
                image = beautiful.shutdown_icon,
                command = function () awful.spawn.with_shell("sudo shutdown -r now") end,
            }),
        },
    },
    ontop = true,
    placement = awful.placement.centered,
    shape = gears.shape.rounded_rect,
    layout = wibox.layout.flex.horizontal,
}

return logout
