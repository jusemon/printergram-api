import Router from 'koa-router';
import { decodeBase64, encodeBase64 } from 'tweetnacl-util';
import { box } from 'tweetnacl';
import config from '../config';
import { encrypt, generateKeyPair } from '../utils/encryption';

const router = new Router({ prefix: '/secrets' });

router.get('/', async (ctx, next) => {
  const pairB = generateKeyPair();

  ctx.body = {
    publicKey: encodeBase64(pairB.publicKey),
  };

  await next();
});

router.get('/:name', async (ctx, next) => {
  const name = ctx.params.name;
  const publicKey = decodeBase64(ctx.header['public-key'] as string);
  const pairA = generateKeyPair();
  const sharedA = box.before(publicKey, pairA.secretKey);

  ctx.body = {
    value: encrypt(sharedA, { ...config }[name] || {}),
    publicKey: encodeBase64(pairA.publicKey),
  };

  await next();
});

export default router;
