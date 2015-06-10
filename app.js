var Cylon = require('cylon');

Cylon.robot({
	connections: {
		neurosky: {adaptor: 'neurosky', port: '/dev/tty.MindWaveMobile-DevA'},
		sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-RBR-AMP-SPP' }
	},

	devices: {
		headset: {driver: 'neurosky', connection: 'neurosky'},
		sphero: {driver: 'sphero', connection: 'sphero'}
	},

	work: function(my){
		my.headset.on('attention', function(data){
			console.log('attention: ' + data);
			if(data > 80){
				my.sphero.roll(70,0,1);
				after((4).seconds(), function(){
					my.sphero.roll(0,0,0);
				});
			}
		});
	}
}).start();