local beautiful = require("beautiful")
local awful = require("awful")
local gears = require("gears")
local wibox = require("wibox")
local helpers = require("helpers")
local lain = require("lain")

local superkey = "Mod4"

local markup     = lain.util.markup
local separators = lain.util.separators
local gray       = "#9E9C9A"

-- Create a textclock widget
mytextclock = wibox.widget.textclock()

-- Calendar
cal = lain.widget.cal({
    attach_to = { mytextclock },
    notification_preset = {
        font = beautiful.font,
        fg   = beautiful.fg_normal,
        bg   = beautiful.bg_normal
    },
    -- Disable icon
    icons = "",
})

-- MPD
mpd = lain.widget.mpd({
    settings = function()
        mpd_notification_preset.fg = white
        artist = mpd_now.artist .. " "
        title  = mpd_now.title  .. " "

        if mpd_now.state == "pause" then
            artist = "mpd "
            title  = "paused "
        elseif mpd_now.state == "stop" then
            artist = ""
            title  = ""
        end

        widget:set_markup(markup.font(beautiful.font, markup(gray, artist) .. title .. " "))
    end
})

-- Net
local wifi_icon = wibox.widget.imagebox()
local eth_icon = wibox.widget.imagebox()
-- TODO: no icon appears
local net = lain.widget.net {
    notify = "off",
    wifi_state = "on",
    eth_state = "on",
    settings = function()
        -- widget:set_markup(markup.font(beautiful.font,
        --                   markup("#7AC82E", " " .. net_now.received)
        --                   .. " " ..
        --                   markup("#46A8C3", " " .. net_now.sent .. " ")))
        -- TODO: probably not right device name
        local eth0 = net_now.devices.eth0
        if eth0 then
            if eth0.ethernet then
                eth_icon:set_image(beautiful.ethernet_icon)
            else
                eth_icon:set_image()
            end
        end

        local wireless = net_now.devices.wlp3s0
        if wireless then
            if wireless.wifi then
                local signal = wireless.signal
                if signal < -83 then
                    wifi_icon:set_image(beautiful.net_weak_icon)
                elseif signal < -70 then
                    wifi_icon:set_image(beautiful.net_mid_icon)
                elseif signal < -53 then
                    wifi_icon:set_image(beautiful.net_good_icon)
                elseif signal >= -53 then
                    wifi_icon:set_image(beautiful.net_great_icon)
                end
            else
                wifi_icon:set_image()
            end
        end
    end
}

-- Create a wibox for each screen and add it
local taglist_buttons = gears.table.join(
                    awful.button({ }, 1, function(t) t:view_only() end),
                    awful.button({ superkey }, 1, function(t)
                                              if client.focus then
                                                  client.focus:move_to_tag(t)
                                              end
                                          end),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ superkey }, 3, function(t)
                                              if client.focus then
                                                  client.focus:toggle_tag(t)
                                              end
                                          end),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(t.screen) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(t.screen) end)
                )

local tasklist_buttons = gears.table.join(
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  -- Without this, the following
                                                  -- :isvisible() makes no sense
                                                  c.minimized = false
                                                  if not c:isvisible() and c.first_tag then
                                                      c.first_tag:view_only()
                                                  end
                                                  -- This will also un-minimize
                                                  -- the client, if needed
                                                  client.focus = c
                                                  c:raise()
                                              end
                                          end),
                     awful.button({ }, 2, function (c) c:kill() end),
                     awful.button({ }, 3, helpers.client_menu_toggle()),
                     awful.button({ }, 4, function () awful.client.focus.byidx(1) end),
                     awful.button({ }, 5, function () awful.client.focus.byidx(-1) end))

-- Layoutbox
-- local function make_layoutbox(width)
--     local layoutbox = wibox.widget.textbox()
--     function layoutbox.update(change)
--         local new = awful.layout.inc(change)
--         -- Pad the name from the left
--         local str = awful.layout.getname()
--         while width - #str > 0 do
--             str = " " .. str
--         end
--         layoutbox.text = str
--         return new
--     end
--     layoutbox.update(0)
--     layoutbox:buttons(gears.table.join(
--                            awful.button({ }, 1, function () layoutbox.update( 1) end),
--                            awful.button({ }, 3, function () layoutbox.update(-1) end),
--                            awful.button({ }, 4, function () layoutbox.update( 1) end),
--                            awful.button({ }, 5, function () layoutbox.update(-1) end)))
--     return layoutbox
-- end

-- ALSA volume
--local volume = lain.widget.alsa({
--    --togglechannel = "IEC958,3",
--    settings = function()
--        header = " Vol "
--        vlevel  = volume_now.level
--        if volume_now.status == "off" then
--            vlevel = vlevel .. "M "
--        else
--            vlevel = vlevel .. " "
--        end
--        widget:set_markup(markup.font(beautiful.font, markup(gray, header) .. vlevel))
--     end
-- })

awful.screen.connect_for_each_screen(function(s)
    -- Create a promptbox for each screen
    s.mypromptbox = awful.widget.prompt()
    -- Create an imagebox widget which will contain an icon indicating which layout we're using.
    -- We need one layoutbox per screen.
    s.mylayoutbox = awful.widget.layoutbox(s)
    s.mylayoutbox:buttons(gears.table.join(
                           awful.button({ }, 1, function () awful.layout.inc( 1) end),
                           awful.button({ }, 3, function () awful.layout.inc(-1) end),
                           awful.button({ }, 4, function () awful.layout.inc( 1) end),
                           awful.button({ }, 5, function () awful.layout.inc(-1) end)))
    -- s.mylayoutbox = make_layoutbox(10)
    -- Create a taglist widget
    s.mytaglist = awful.widget.taglist(s, awful.widget.taglist.filter.all, taglist_buttons)

    -- Create a tasklist widget
    s.mytasklist = awful.widget.tasklist(s, awful.widget.tasklist.filter.currenttags, tasklist_buttons)

    -- Create the wibox
    s.mywibox = awful.wibar({ position = beautiful.wibar_position, height = beautiful.wibar_height, screen = s })

    -- Add widgets to the wibox
    s.mywibox:setup {
        layout = wibox.layout.align.horizontal,
        { -- Left widgets
            spacing = 10,
            -- spacing_widget = {
            --     color = beautiful.separator_fg,
            --     widget = wibox.widget.separator,
            -- },
            layout = wibox.layout.fixed.horizontal,
            mpd.widget,
            s.mytaglist,
            s.mypromptbox,
        },
        s.mytasklist, -- Middle widget
        { -- Right widgets
            spacing = 10,
            -- spacing_widget = {
            --     color = beautiful.separator_fg,
            --     widget = wibox.widget.separator,
            -- },
            layout = wibox.layout.fixed.horizontal,
            -- Keyboard map indicator and switcher
            -- awful.widget.keyboardlayout()
            wibox.widget.systray(),
            s.mylayoutbox,
            net.widget,
            mytextclock,
        },
    }
end)
