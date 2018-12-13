import TransactionApi from '../TransactionApi';
import PeerApi from '../PeerApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';
import { Transaction, TransactionType, VoteType, TransactionVote, TransactionDelegate } from '../../model/Transaction';

import { expect } from 'chai';
import { PrivateKey } from '../../index';

import 'rxjs/add/operator/take'
import 'rxjs/add/operator/toPromise'

/* tslint:disable:no-unused-expression */
const network = Network.getDefault(NetworkType.Devnet);
const http = new Http(network);

let api: TransactionApi;

describe('TransactionApi', () => {
  const address = 'Pgb6nDqqW3QypWNtpzuFgw2BfUnXoMCBP7';

  before(async () => {
    const peerApi = new PeerApi(http);
    const goodPeer = await peerApi.findGoodPeer().take(1).toPromise();

    network.activePeer = goodPeer;
    api = new TransactionApi(new Http(network));
  });

  it('should be instance of TransactionApi', () => {
    expect(api).to.be.instanceOf(TransactionApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('createTransaction');
    expect(api).to.have.property('createVote');
    expect(api).to.have.property('createDelegate');
    expect(api).to.have.property('createSignature');
    expect(api).to.have.property('post');
    expect(api).to.have.property('get');
    expect(api).to.have.property('getUnconfirmed');
    expect(api).to.have.property('list');
    expect(api).to.have.property('listUnconfirmed');
  });

  describe('signature check', () => {

    it('should correctly sign a tx with PrivateKey', () => {
      const key = PrivateKey.fromWIF('SCxryiz5hhkfJ4bZ7RGVzkdLqyvU7UfNFaT1ak9Gg9PSeqCAWy3h');

      return api.createTransaction({
        amount: 10,
        passphrase: key,
        recipientId: 'PoBvx2ESMZr6Sz7P6SnaR4UXDHCAe2Tz4N',
        timestamp: 1,
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3045022100a6ae1d8dada898fc12ba6ea3cd39751ffe58435ac07620a7c6731e68f6fd7ffb02205131534571a4809ea3607a9c65431491756c9984218fdb3ed17446d2403c8a5a');
        expect(transaction.id).to.be.deep.eq('e56957065eb13dfcaceeddaccc2708ca72184f5f24c2e06092a0a7117fdf4faf');
        // tslint:enable
      });
    });

    it('should correctly sign a send tx', () => {
      return api.createTransaction({
        amount: 10,
        passphrase: 'mysecret',
        recipientId: 'PoBvx2ESMZr6Sz7P6SnaR4UXDHCAe2Tz4N',
        timestamp: 1,
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3045022100a6ae1d8dada898fc12ba6ea3cd39751ffe58435ac07620a7c6731e68f6fd7ffb02205131534571a4809ea3607a9c65431491756c9984218fdb3ed17446d2403c8a5a');
        expect(transaction.id).to.be.deep.eq('e56957065eb13dfcaceeddaccc2708ca72184f5f24c2e06092a0a7117fdf4faf');
        // tslint:enable
      });
    });

    it('should correctly sign a tx with vendorField', () => {
      return api.createTransaction({
        amount: 10,
        passphrase: 'mysecret',
        recipientId: 'PoBvx2ESMZr6Sz7P6SnaR4UXDHCAe2Tz4N',
        timestamp: 1,
        vendorField: 'hi from vekexasia',
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3044022061253650c7f222c0d9f0f3b86a6f4a147a8af1bef17220fb74ff8aaea32c6cb402206444acb1a6f2bcdaad76aa17ec8f46613d8dc12d37649009d0c7952ba2c95abc');
        expect(transaction.id).to.be.deep.eq('4dd8ffc63aa5a3e92ab9fb93c7497fffedaf566e6d6e5a99f1367382b2c93044');
        // tslint:enable
      });
    });

  });

  it('should create a instance of Transaction from createTransaction', () => {
    return api.createTransaction({
      amount: 100000000,
      passphrase: 'my secret',
      recipientId: address,
      vendorField: 'Send transaction by phantom-tsc',
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
    });
  });

  it('should create an instance of transaction with given parameters', () => {
    return api.createTransaction({
      amount: 100000000,
      passphrase: 'my secret',
      recipientId: address,
      vendorField: 'Send transaction by phantom-tsc',
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.amount).to.be.eq(100000000);
      expect(transaction.recipientId).to.be.eq(address);
      expect(transaction.vendorField).to.be.eq('Send transaction by phantom-tsc');
      expect(transaction.type).to.be.eq(0);

    });
  });

  it('should create a instance of Transaction from createVote', () => {
    const delegatePublicKey = '021e6d971e5885a3147ddf1e45bf5c8d0887ad9fc659e24bdf95c2c9607e7e3fe8';
    const vote = <TransactionVote> {};
    vote.delegatePublicKey = delegatePublicKey;
    vote.passphrase = 'my secret';
    vote.type = VoteType.Add;
    vote.vendorField = 'Send vote transaction by phantom-tsc';
    return api.createVote(vote).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.type).to.be.eq(TransactionType.Vote);
      expect(transaction.asset.votes[0]).to.be.eq('+' + delegatePublicKey);
      expect(transaction.vendorField).to.be.eq('Send vote transaction by phantom-tsc');
    });
  });

  it('should create a instance of Transaction from createDelegate', () => {
    const publicKey = '03dcd9356b9f4e13a70fed664753e86ddbaf3d362ea8b35b6a9f4325ceda52ca7e';
    const username = 'lorenzo';
    const delegate = <TransactionDelegate> {};
    delegate.passphrase = 'my secret';
    delegate.publicKey = publicKey;
    delegate.username = username;
    delegate.vendorField = 'Send delegate transaction by phantom-tsc';

    return api.createDelegate(delegate).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.type).to.be.eq(TransactionType.CreateDelegate);
      expect(transaction.asset.delegate.publicKey).to.be.eq(publicKey);
      expect(transaction.asset.delegate.username).to.be.eq(username);
      expect(transaction.vendorField).to.be.eq('Send delegate transaction by phantom-tsc');
    });
  });

  it('should create a instance of Transaction from createSignature', () => {
    return api.createSignature('my secret', 'my second secret passphrase', 'Send signature transaction by phantom-tsc').forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.type).to.be.eq(TransactionType.SecondSignature);
      expect(transaction.vendorField).to.be.eq('Send signature transaction by phantom-tsc');
    });
  });

  it('should create a instance of Transaction from createSignature with PrivateKey', () => {
    return api.createSignature(PrivateKey.fromSeed('my secret'), 'my second secret passphrase')
      .forEach((transaction) => {
        expect(transaction).to.be.instanceOf(Transaction);
      });
  });

  it('should return success from get', () => {
    return api.get('0e2ebe16b816bc848838189be35a157d1153d96e63baa8269186a25b904d5107').forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return false on success field from getUnconfirmed', () => {
    return api.getUnconfirmed(
      '0e2ebe16b816bc848838189be35a157d1153d96e63baa8269186a25b904d5107',
    ).forEach((response) => {
      expect(response).to.have.property('success', false);
    });
  });

  it('should return success from list', () => {
    return api.list({orderBy: 'timestamp:desc', limit: 10}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from listUnconfirmed', () => {
    return api.listUnconfirmed().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return false on success field from post send transaction', () => {
    //tslint:disable
    const transaction = {
      amount: 100000000,
      fee: 10000000,
      id: '0e2ebe16b816bc848838189be35a157d1153d96e63baa8269186a25b904d5107',
      recipientId: 'PoBvx2ESMZr6Sz7P6SnaR4UXDHCAe2Tz4N',
      senderPublicKey: '039061f5923dc839fdbb69b9ed56c516d5d313d54de1bd8ccca87188767d5641fb',
      signature: '3045022100a6ae1d8dada898fc12ba6ea3cd39751ffe58435ac07620a7c6731e68f6fd7ffb02205131534571a4809ea3607a9c65431491756c9984218fdb3ed17446d2403c8a5a',
      timestamp: 9870360,
      type: 0,
      vendorField: 'Send transaction by phantom-tsc'
    };

    return api.post(transaction).forEach((response) => {
      if (network.isV2) {
        expect(response.data).to.have.property('invalid');
        expect(response.data.invalid[0]).to.be.eq(transaction.id);
      } else {
        expect(response).to.have.property('success', false);
      }
    });
  });

});
