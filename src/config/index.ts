// tslint:disable:object-literal-sort-keys

export default {
  networks: {
    mainnet: {
      bip32: {
        private: 0x043587cf,
        public: 0x04358394,
      },
      name: 'mainnet',
      nethash: 'c1464efad94d7a3bd1d7f9ab6db0a1e1d042279a0c7c2a41a625928df7ceefec',
      token: 'XPH',
      symbol: 'Ẕ',
      version: 56,
      explorer: 'http://explorer.phantom.org',
      wif: 0xbc,
      p2pPort: 4002,
      apiPort: 4003,
      p2pVersion: '2.0.0',
      isV2: true,
      activePeer: {
        ip: '95.183.52.105',
        port: 4003,
      },
      peers: [
        '95.183.52.105:4002',
      ],
    },
    devnet: {
      bip32: {
        public: 0x043587cf,
        private: 0x04358394,
      },
      name: 'devnet',
      nethash: 'c1464efad94d7a3bd1d7f9ab6db0a1e1d042279a0c7c2a41a625928df7ceefec',
      token: 'DXPH',
      symbol: 'DẔ',
      version: 56,
      explorer: 'http://explorer.phantom.org',
      wif: 0xbc,
      p2pPort: 4002,
      apiPort: 4003,
      p2pVersion: '2.0.0',
      isV2: true,
      activePeer: {
        ip: '95.183.52.105',
        port: 4003,
      },
      peers: [
        '95.183.52.105:4002',
      ],
    },
  },
  blockchain: {
    interval: 8,
    delegates: 51,
    date: new Date(Date.UTC(2017, 2, 21, 13, 0, 0, 0)),
  },
};
