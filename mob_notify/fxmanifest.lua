fx_version 'bodacious'
game 'gta5'
description 'Notifications'

version '1.2'

client_scripts {
	'client.lua'
}

server_scripts {
	'server.lua',
}

shared_script '@es_extended/imports.lua'

ui_page 'web/index.html'

files {
	'web/index.html',
	'web/main.js',
	'web/style.css',
	'web/assets/notification.ogg',
	'web/assets/drip.ogg',
}
