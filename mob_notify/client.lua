local sound = true

--================= Resource Manifest =================--
AddEventHandler('onResourceStop', function()
	if (GetCurrentResourceName() ~= 'mob_notify') then
	  return
	end
	SetNuiFocus(false, false)
end)

--================== Resource Events ==================--
RegisterNetEvent('mob_notify:sendNotification')
AddEventHandler('mob_notify:sendNotification', function(icon, msg, ms)
	sendNotification(icon, msg, ms)
end)

--================ Resource Funcstions ================--
function sendNotification(icon, msg, ms)
	SendNUIMessage({ action = 'send-notification', icon = icon, msg = msg, ms = ms })
end
