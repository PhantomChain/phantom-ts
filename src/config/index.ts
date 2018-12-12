// tslint:disable:object-literal-sort-keys

export default {
  networks: {
    mainnet: {
      bip32: {
        private: 0x2bf4530,
        public: 0x2bf4968,
      },
      name: 'mainnet',
      nethash: '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988',
      token: 'XPH',
      symbol: 'Ẕ',
      version: 0x38,
      explorer: 'https://explorer.phantom.org/',
      wif: 0xbc,
      p2pPort: 4001,
      apiPort: 4003,
      p2pVersion: '2.0.0',
      isV2: true,
      activePeer: {
        ip: '',
        port: 4003,
      },
      peers: [ ],
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
      explorer: 'https://explorer.phantom.org/',
      wif: 0xbc,
      p2pPort: 4000,
      apiPort: 4003,
      p2pVersion: '2.0.0',
      isV2: true,
      activePeer: {
        ip: '192.168.0.244',
        port: 4000,
      },
      peers: [
        '192.168.0.244:4000',
      ],
    },
  },
  blockchain: {
    interval: 8,
    delegates: 51,
    date: new Date(Date.UTC(2017, 2, 21, 13, 0, 0, 0)),
  },
};
