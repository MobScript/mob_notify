RegisterCommand('announce', function(source, args)
    local user = ESX.GetPlayerFromId(source)

    if user.getGroup() == 'admin' or 'superadmin' then
        sendAnnounce(table.concat(args, ' '))
    elseif user.getGroup() == 'mod' then
        TriggerClientEvent('mob_notify:sendNotification', source, 'fa-solid fa-lock', 'No puede usar este comando como moderador, solo se permiten administradores y superadministradores', 4000)
    else 
        TriggerClientEvent('mob_notify:sendNotification', source, 'fa-solid fa-lock', 'No tienes permiso para ese comando!', 4000)
    end
end)

function sendAnnounce(text) 
    local xPlayers = ESX.GetPlayers()
    for i=1, #xPlayers, 1 do
        local xPlayer = ESX.GetPlayerFromId(xPlayers[i]) 
        TriggerClientEvent('mob_notify:sendAnnounce', xPlayer.source, text, 10000)
    end
end

