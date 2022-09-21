local sound = true

--================= Resource Manifest =================--
AddEventHandler('onResourceStop', function()
	if (GetCurrentResourceName() ~= 'mob_notify') then
	  return
	end
	SetNuiFocus(false, false)
end)

--================== Resource Events ==================--
RegisterNetEvent('mob_notify:sendAnnounce')
AddEventHandler('mob_notify:sendAnnounce', function(text, ms) 
	sendAnnounce(text, ms)
end)

RegisterNetEvent('mob_notify:showFloatingText')
AddEventHandler('mob_notify:showFloatingText', function(text) 
	showFloatingText(text)
end)

RegisterNetEvent('mob_notify:hideFloatingText')
AddEventHandler('mob_notify:hideFloatingText', function(text) 
	hideFloatingText()
end)

RegisterNetEvent('mob_notify:sendNotification')
AddEventHandler('mob_notify:sendNotification', function(icon, msg, ms)
	sendNotification(icon, msg, ms)
end)

RegisterNetEvent('mob_notify:sendAlert')
AddEventHandler('mob_notify:sendAlert', function(type, msg, ms)
	sendAlert(type, msg, ms)
end)

RegisterNetEvent('mob_notify:progressBar')
AddEventHandler('mob_notify:progressBar', function(text, ms)
	SendNUIMessage({action = 'createProgressBar', text = text, ms = ms})
end)

--================ Resource Funcstions ================--
function sendAnnounce(text, ms) 
	SendNUIMessage({action = 'sendAnnounce', text = text, ms = ms})
end

function showFloatingText(text)
	SendNUIMessage({ action = 'showFloatingText', text = text })
end

function hideFloatingText()
	SendNUIMessage({ action = 'hideFloatingText' })
end

function sendNotification(icon, msg, ms)
	SendNUIMessage({ action = 'send-notification', icon = icon, msg = msg, ms = ms })
end

function sendAlert(type, msg, ms)
	SendNUIMessage({ action = 'send-alert', type = type, msg = msg, ms = ms })
end

--================= Resource Commands ================--
RegisterCommand('sound', function()
	sound = not sound
	SendNUIMessage({action = 'updateSound', sound = sound})
	if sound then
		sendNotification('fa fa-music', 'Sound turned on', 2000)
	else
		sendNotification('fas fa-volume-mute', 'Sound turned off', 2000)
	end
end)


RegisterCommand("M1", function()
	sendNotification('fas fa-check', 'The car was bought successfully!', 4000)
end)


RegisterCommand('notify', function()
	sendNotification('fa-solid fa-user-large', 'Lore ipsume napusis mi se kure!', 5000)
	Wait(2000)
	sendNotification('fa-solid fa-user-large', 'Lore ipsume napusis mi se kure!', 5000)
end)

RegisterCommand('suc', function()
	sendAlert('success', 'Lore ipsume napusis mi se kure!', 5000)
end)

RegisterCommand('err', function()
	sendAlert('error', 'Lore ipsume napusis mi se kure!', 5000)
end)

RegisterCommand('war', function()
	sendAlert('warning', 'Lore ipsume napusis mi se kure!', 5000)
end)

RegisterCommand('alerts', function()
	sendAlert('success', 'Lore ipsume napusis mi se kure!', 5000)
	Wait(2000)
	sendAlert('error', 'Lore ipsume napusis mi se kure!', 5000)
	Wait(2000)
	sendAlert('warning', 'Lore ipsume napusis mi se kure!', 5000)
end)
