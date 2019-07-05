-----------------------------------------------------------------------------
--       d8888 888                                              d8b          
--      d88888 888                                              Y8P          
--     d88P888 888                                                           
--    d88P 888 888  .d88b.   .d88b.  88888b.   .d88888 888  888 888 88888b.  
--   d88P  888 888 d88P"88b d88""88b 888 "88b d88" 888 888  888 888 888 "88b 
--  d88P   888 888 888  888 888  888 888  888 888  888 888  888 888 888  888 
-- d8888888888 888 Y88b 888 Y88..88P 888  888 Y88b 888 Y88b 888 888 888  888 
--d88P     888 888  "Y88888  "Y88P"  888  888  "Y88888  "Y88888 888 888  888 
--                      888                        888                       
--                 Y8b d88P                        888                       
--                  "Y88P"                         888                       
-----------------------------------------------------------------------------

local theme_assets = require("beautiful.theme_assets")
local xresources = require("beautiful.xresources")
local dpi = xresources.apply_dpi
local gfs = require("gears.filesystem")
local themes_path = os.getenv("HOME") .. "/.config/awesome/themes/"
local theme_name = "algonquin"
local icon_path = themes_path .. theme_name .. "/icons/"
local titlebar_icon_path = themes_path .. theme_name .. "/titlebar/"
local tip = titlebar_icon_path -- alias to save time
local xrdb = xresources.get_current_theme()
local theme = {}

theme.tip = titlebar_icon_path

local awful = require("awful")
-- Used to make it easier to align the panels in specific monitor positions
local screen_width = awful.screen.focused().geometry.width
local screen_height = awful.screen.focused().geometry.height

theme.wallpaper     = '/home/tim/Pictures/Unsplash/ferdinand-stohr-144600-unsplash.jpg'
theme.font          = "Iosevka Nerd Font Regular 10"
theme.taglist_font  = "Iosevka Nerd Font Oblique 9"

-- Colours
local xbackground = xrdb.background or	"#1E2541"
local xforeground = xrdb.foreground or	"#EEFFFF"
local xcolor0 = xrdb.color0 or	"#1E2541"
local xcolor1 = xrdb.color1 or	"#F0719B"
local xcolor2 = xrdb.color2 or	"#5AF7B0"
local xcolor3 = xrdb.color3 or	"#FFA56B"
local xcolor4 = xrdb.color4 or	"#57C7FF"
local xcolor5 = xrdb.color5 or	"#C792EA"
local xcolor6 = xrdb.color6 or	"#89DDFF"
local xcolor7 = xrdb.color7 or	"#EEFFFF"
local xcolor8 = xrdb.color8 or	"#354274"
local xcolor9 = xrdb.color9 or	"#F02E6E"
local xcolor10 = xrdb.color10 or	"#2CE592"
local xcolor11 = xrdb.color11 or	"#FF8537"
local xcolor12 = xrdb.color12 or	"#1DA0E2"
local xcolor13 = xrdb.color13 or	"#A742EA"
local xcolor14 = xrdb.color14 or	"#47BAE8"
local xcolor15 = xrdb.color15 or	"#DEE6E7"
local xcolor16 = awesome.xrdb_get_value("", "color16") or	"#2A335A"

-- local minimize_color = xcolor8
local backdrop_color = xbackground
local unfocused_color = xcolor7
local focused_color = xcolor8
local urgent_color = xcolor1
local accent_color = xcolor3

theme.bg_dark       = unfocused_color
theme.bg_normal     = backdrop_color
theme.bg_focus      = backdrop_color
theme.bg_urgent     = backdrop_color
-- theme.bg_minimize   = minimize_color --"#444444"
-- theme.bg_systray    = bg_dark

theme.fg_normal     = xforeground
theme.fg_focus      = focused_color
theme.fg_urgent     = urgent_color
-- theme.fg_minimize   = minimize_color --"#ffffff"
theme.border_width                              = 1
theme.border_normal                             = xbackground
theme.border_focus                              = xforeground
-- theme.taglist_fg_focus                          = xforeground
theme.tasklist_bg_normal                        = xbackground
theme.tasklist_fg_focus                         = xcolor3

-- Gaps
theme.useless_gap   = dpi(0)
theme.screen_margin = dpi(0)

-- Borders
theme.border_width  = dpi(3)
theme.border_normal = backdrop_color
theme.border_focus  = accent_color
-- theme.border_marked = "#91231c"
-- Rounded corners
theme.border_radius = dpi(8)

-- Widget separator
theme.separator_text = " ⠐ "
theme.separator_fg = xcolor4

-- Wibar
theme.wibar_position = "top"
theme.wibar_height = dpi(18)
theme.wibar_fg = theme.fg_normal
theme.wibar_bg = theme.bg_normal

-- Notifications
-- Position: bottom_left, bottom_right, bottom_middle,
--         top_left, top_right, top_middle
theme.notification_position = "top_right" -- BUG: some notifications appear at top_right regardless
theme.notification_border_width = 2
theme.notification_border_radius = theme.border_radius
theme.notification_border_color = xcolor3
theme.notification_bg = xbackground
theme.notification_fg = xforeground
theme.notification_crit_bg = urgent_color
theme.notification_crit_fg = xcolor0
theme.notification_icon_size = dpi(16)
-- theme.notification_height = dpi(80)
-- theme.notification_width = dpi(300)
theme.notification_margin = dpi(15)
theme.notification_opacity = 1
theme.notification_font = theme.font
theme.notification_padding = theme.screen_margin * 2
theme.notification_spacing = theme.screen_margin * 2


-- There are other variable sets
-- overriding the default one when
-- defined, the sets are:
-- taglist_[bg|fg]_[focus|urgent|occupied|empty|volatile]
-- tasklist_[bg|fg]_[focus|urgent]
-- titlebar_[bg|fg]_[normal|focus]
-- tooltip_[font|opacity|fg_color|bg_color|border_width|border_color]
-- mouse_finder_[color|timeout|animate_timeout|radius|factor]
-- prompt_[fg|bg|fg_cursor|bg_cursor|font]
-- hotkeys_[bg|fg|border_width|border_color|shape|opacity|modifiers_fg|label_bg|label_fg|group_margin|font|description_font]
-- Example:
--theme.taglist_bg_focus = "#ff0000"

-- Prompt
theme.prompt_fg = xforeground

-- Tag names
-- local symb = "  "
local symb = "●"
theme.tagnames = { symb, symb, symb, symb, symb, symb, symb, symb, symb }

-- Taglist
theme.taglist_font = theme.font
theme.taglist_bg_focus = theme.bg_focus .. "00"
theme.taglist_fg_focus = focused_color
theme.taglist_bg_occupied = theme.bg_focus .. "00"
theme.taglist_fg_occupied = xcolor11
theme.taglist_bg_empty = theme.bg_focus .. "00"
theme.taglist_fg_empty = xcolor4
theme.taglist_bg_urgent = theme.bg_focus .. "00"
theme.taglist_fg_urgent = xcolor13
theme.taglist_disable_icon = true
theme.taglist_spacing = dpi(0)
theme.taglist_item_roundness = theme.border_radius
-- Generate taglist squares:
local taglist_square_size = dpi(0)
theme.taglist_squares_sel = theme_assets.taglist_squares_sel(
    taglist_square_size, theme.fg_normal
)
theme.taglist_squares_unsel = theme_assets.taglist_squares_unsel(
    taglist_square_size, theme.fg_normal
)

-- Variables set for theming notifications:
-- notification_font
-- notification_[bg|fg]
-- notification_[width|height|margin]
-- notification_[border_color|border_width|shape|opacity]

-- Variables set for theming the menu:
-- menu_[bg|fg]_[normal|focus]
-- menu_[border_color|border_width]
-- theme.menu_submenu_icon = themes_path..theme_name.."/submenu.png"
theme.menu_height = dpi(15)
theme.menu_width  = dpi(100)

-- Titlebars
theme.titlebar_size = dpi(32)
theme.titlebar_title_enabled = true
theme.titlebar_bg = bg_normal
theme.titlebar_fg_focus = fg_focus
theme.titlebar_fg_normal = fg_normal

-- Define the image to load
theme.titlebar_close_button_normal = tip.."close_normal.svg"
theme.titlebar_close_button_focus  = tip.."close_focus.svg"

theme.titlebar_minimize_button_normal = tip.."minimize_normal.svg"
theme.titlebar_minimize_button_focus  = tip.."minimize_focus.svg"

theme.titlebar_ontop_button_normal_inactive = tip.."ontop_normal_inactive.svg"
theme.titlebar_ontop_button_focus_inactive  = tip.."ontop_focus_inactive.svg"
theme.titlebar_ontop_button_normal_active = tip.."ontop_normal_active.svg"
theme.titlebar_ontop_button_focus_active  = tip.."ontop_focus_active.svg"

theme.titlebar_sticky_button_normal_inactive = tip.."sticky_normal_inactive.svg"
theme.titlebar_sticky_button_focus_inactive  = tip.."sticky_focus_inactive.svg"
theme.titlebar_sticky_button_normal_active = tip.."sticky_normal_active.svg"
theme.titlebar_sticky_button_focus_active  = tip.."sticky_focus_active.svg"

theme.titlebar_floating_button_normal_inactive = tip.."floating_normal_inactive.svg"
theme.titlebar_floating_button_focus_inactive  = tip.."floating_focus_inactive.svg"
theme.titlebar_floating_button_normal_active = tip.."floating_normal_active.svg"
theme.titlebar_floating_button_focus_active  = tip.."floating_focus_active.svg"

theme.titlebar_maximized_button_normal_inactive = tip.."maximized_normal_inactive.svg"
theme.titlebar_maximized_button_focus_inactive  = tip.."maximized_focus_inactive.svg"
theme.titlebar_maximized_button_normal_active = tip.."maximized_normal_active.svg"
theme.titlebar_maximized_button_focus_active  = tip.."maximized_focus_active.svg"

-- You can use your own layout icons like this:
-- NB: be careful to see if the file's name ends with a "w" before the extension
theme.layout_fairh = themes_path..theme_name.."/layouts/fairh.png"
theme.layout_fairv = themes_path..theme_name.."/layouts/fairv.png"
theme.layout_floating  = themes_path..theme_name.."/layouts/floating.png"
theme.layout_magnifier = themes_path..theme_name.."/layouts/magnifier.png"
theme.layout_max = themes_path..theme_name.."/layouts/max.png"
theme.layout_fullscreen = themes_path..theme_name.."/layouts/fullscreen.png"
theme.layout_tilebottom = themes_path..theme_name.."/layouts/tilebottom.png"
theme.layout_tileleft   = themes_path..theme_name.."/layouts/tileleft.png"
theme.layout_tile = themes_path..theme_name.."/layouts/tile.png"
theme.layout_tiletop = themes_path..theme_name.."/layouts/tiletop.png"
theme.layout_spiral  = themes_path..theme_name.."/layouts/spiral.png"
theme.layout_dwindle = themes_path..theme_name.."/layouts/dwindle.png"
theme.layout_cornernw = themes_path..theme_name.."/layouts/cornernw.png"
theme.layout_cornerne = themes_path..theme_name.."/layouts/cornerne.png"
theme.layout_cornersw = themes_path..theme_name.."/layouts/cornersw.png"
theme.layout_cornerse = themes_path..theme_name.."/layouts/cornerse.png"

-- Generate Awesome icon:
theme.awesome_icon = theme_assets.awesome_icon(
    theme.menu_height, theme.bg_focus, theme.fg_focus
)

-- More icons
theme.net_up                                    = icon_path .. "/net_up.png"
theme.net_down                                  = icon_path .. "/net_down.png"
theme.web_icon                                  = icon_path .. "/compass.svg"
theme.firefox_icon                              = icon_path .. "/firefox.svg"
theme.files_icon                                = icon_path .. "/folder-multiple.svg"
theme.mail_icon                                 = icon_path .. "/email.svg"
theme.music_icon                                = icon_path .. "/music.svg"
theme.steam_icon                                = icon_path .. "/steam.svg"
theme.terminal_icon                             = icon_path .. "/console-line.svg"
theme.ethernet_icon                             = icon_path .. "/ethernet.svg"
theme.net_weak_icon                             = icon_path .. "/network-strength-1.svg"
theme.net_mid_icon                              = icon_path .. "/network-strength-2.svg"
theme.net_good_icon                             = icon_path .. "/network-strength-3.svg"
theme.net_great_icon                            = icon_path .. "/network-strength-4.svg"

-- Define the icon theme for application icons. If not set then the icons
-- from /usr/share/icons and /usr/share/icons/hicolor will be used.
theme.icon_theme = "/usr/share/icons/Moka"

return theme

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
