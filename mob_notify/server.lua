RegisterCommand('announce', function(source, args)
    local user = ESX.GetPlayerFromId(source)

    if user.getGroup() == 'admin' or 'superadmin' then
        sendAnnounce(table.concat(args, ' '))
    elseif user.getGroup() == 'mod' then
        TriggerClientEvent('mob_notify:sendNotification', source, 'fa-solid fa-lock', 'You cannot use this command as a moderator, only admins and superadmins are allowed', 4000)
    else 
        TriggerClientEvent('mob_notify:sendNotification', source, 'fa-solid fa-lock', 'You dont have permission for that command!', 4000)
    end
end)

function sendAnnounce(text) 
    local xPlayers = ESX.GetPlayers()
    for i=1, #xPlayers, 1 do
        local xPlayer = ESX.GetPlayerFromId(xPlayers[i]) 
        TriggerClientEvent('mob_notify:sendAnnounce', xPlayer.source, text, 10000)
    end
end

