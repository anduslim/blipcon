var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var bunyan = require('bunyan');
var CurrentPath = __dirname;

EddystoneBeaconScanner.on('found', function(beacon) {
  console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.on('updated', function(beacon) {
  var incoming = JSON.stringify(beacon, null, 2);
  var LoggingFile = CurrentPath + '/' + beacon.instance + '.json';
  var log = bunyan.createLogger({
    name: beacon.instance,
    streams: [{
        path: LoggingFile,
    }]
  });
  log.info(incoming);
  console.log('updated Eddystone Beacon:\n', incoming);
});

EddystoneBeaconScanner.on('lost', function(beacon) {
  console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.startScanning(true);

