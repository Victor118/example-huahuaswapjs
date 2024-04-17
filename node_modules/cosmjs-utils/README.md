# cosmjs-utils

CosmJS utilities

```
yarn add cosmjs-utils
```
## Creating Signers

To broadcast messages, you'll want to use either [keplr](https://docs.keplr.app/api/cosmjs.html) or an `OfflineSigner` from `cosmjs` using mnemonics.
### Amino Signer

Likely you'll want to use the Amino, so unless you need proto, you should use this one:

```js
import { getOfflineSignerAmino as getOfflineSigner } from 'cosmjs-utils';
```
### Proto Signer

```js
import { getOfflineSignerProto as getOfflineSigner } from 'cosmjs-utils';
```

WARNING: NOT RECOMMENDED TO USE PLAIN-TEXT MNEMONICS. Please take care of your security and use best practices such as AES encryption and/or methods from 12factor applications.

```js
import { chains } from 'chain-registry';

const mnemonic =
  'unfold client turtle either pilot stock floor glow toward bullet car science';
  const chain = chains.find(({ chain_name }) => chain_name === 'osmosis');
  const signer = await getOfflineSigner({
    mnemonic,
    chain
  });
```

## Broadcasting messages

Now that you have your `client`, you can broadcast messages:

```js
import { signAndBroadcast } from 'cosmjs-utils';

const res = await signAndBroadcast({
  client, // SigningStargateClient
  chainId: 'osmosis-1', // use 'osmo-test-4' for testnet
  address,
  msgs: [msg],
  fee,
  memo: ''
});
```