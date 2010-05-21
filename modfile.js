function ModFile(mod) {
	function trimNulls(str) {
		return str.replace(/\x00+$/, '');
	}
	function getWord(str, pos) {
		return (str.charCodeAt(pos) << 8) + str.charCodeAt(pos+1)
	}

	this.data = mod;
	this.samples = [];
	this.positions = [];
	this.patternCount = 0;
	this.patterns = [];
	
	this.title = trimNulls(mod.substr(0, 20))

	/* TODO: distinguish 15-sample and 31-sample mods. Currently assuming 31-sample.
	"Check the bytes at location 471 in the file. If there is text there (ASCII
	$20-$7E (32-126)), then you can probably assume it's a 31-instrument file.
	Otherwise, it's an older 15 instrument file." */
	
	this.sampleCount = 31;

	for (var i = 0; i < this.sampleCount; i++) {
		var sampleInfo = mod.substr(20 + i*30, 30);
		var sampleName = trimNulls(sampleInfo.substr(0, 22));
		this.samples[i] = {
			length: getWord(sampleInfo, 22) * 2,
			finetune: sampleInfo.charCodeAt(24),
			volume: sampleInfo.charCodeAt(25),
			repeatOffset: getWord(sampleInfo, 26) * 2,
			repeatLength: getWord(sampleInfo, 28) * 2,
		}
	}
	
	this.positionCount = mod.charCodeAt(950);
	this.positionLoopPoint = mod.charCodeAt(951);
	for (var i = 0; i < 128; i++) {
		this.positions[i] = mod.charCodeAt(952+i);
		if (this.positions[i] >= this.patternCount) {
			this.patternCount = this.positions[i]+1;
		}
	}
	
	var identifier = mod.substr(1080, 4);
	switch(identifier) {
		case '2CHN':
			this.channelCount = 2;
			break;
		case 'M.K.':
		case 'FLT4':
		case 'M!K!':
		case '4CHN':
			this.channelCount = 4;
			break;
		case '6CHN':
			this.channelCount = 6;
			break;
		case '8CHN':
		case 'OCTA':
		case 'CD81':
			this.channelCount = 8;
			break;
		default:
			console.log("Warning: unknown identifier " + identifier + ". Assuming 4 channels.");
			this.channelCount = 4;
	}
	
	var patternOffset = 1084;
	for (var pat = 0; pat < this.patternCount; pat++) {
		this.patterns[pat] = [];
		for (var row = 0; row < 64; row++) {
			this.patterns[pat][row] = [];
			for (var chan = 0; chan < this.channelCount; chan++) {
				b0 = mod.charCodeAt(patternOffset);
				b1 = mod.charCodeAt(patternOffset + 1);
				b2 = mod.charCodeAt(patternOffset + 2);
				b3 = mod.charCodeAt(patternOffset + 3);
				this.patterns[pat][row][chan] = {
					sample: (b0 & 0xf0) || (b2 >> 4),
					period: ((b0 & 0x0f) << 8) || b1,
					effect: b2 & 0x0f,
					effectParameter: b3
				};
				patternOffset += 4;
			}
		}
	}
	
	var sampleOffset = patternOffset;
	for (var s = 0; s < this.sampleCount; s++) {
		this.samples[s].startOffset = sampleOffset;
		sampleOffset += this.samples[s].length;
	}
}
