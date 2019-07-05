local awful = require('awful')
local gears = require('gears')
local beautiful = require('beautiful')

local function renderClient(client)
  if client.skip_decoration then
    log_this('tutu')
    return
  end

  if
    (client.screen.clientMode == 'maximized' and (client.type ~= 'dialog' and client.floating == false)) or
      client.fullscreen
   then
    client.border_width = 0
    client.shape = function(cr, w, h)
      gears.shape.rectangle(cr, w, h)
    end
  else
    client.border_width = beautiful.border_width
    client.shape = function(cr, w, h)
      gears.shape.rounded_rect(cr, w, h, 8)
    end
  end
end

local function changesOnScreen(currentScreen)
  local tagIsMax = currentScreen.selected_tag ~= nil and currentScreen.selected_tag.layout == awful.layout.suit.max
  local clientsCount = 0

  for i, client in pairs(currentScreen.clients) do
    if client.type ~= 'dialog' and client.floating == false and not client.sticky then
      clientsCount = clientsCount + 1
    end
  end

  local newClientsMode = 'tiled'
  if (tagIsMax or clientsCount == 1) then
    newClientsMode = 'maximized'
  end

  currentScreen.clientMode = newClientsMode

  for i, client in pairs(currentScreen.clients) do
    renderClient(client)
  end
end

client.connect_signal(
  'manage',
  function(c)
    -- log_this(tostring(c.window))
    renderClient(c)
    if (c.screen) then
      changesOnScreen(c.screen)
    end
  end
)

client.connect_signal(
  'unmanage',
  function(c)
    changesOnScreen(c.screen)
  end
)

client.connect_signal(
  'property::fullscreen',
  function(c)
    renderClient(c)
    if (c.screen) then
      changesOnScreen(c.screen)
    end
  end
)

tag.connect_signal(
  'property::selected',
  function(t)
    if t.screen then
      changesOnScreen(t.screen)
    end
  end
)

tag.connect_signal(
  'property::layout',
  function(t)
    if t.screen then
      changesOnScreen(t.screen)
    end
  end
)
