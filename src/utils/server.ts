import { NetworkInterfaceInfo, networkInterfaces } from 'os';

export const startServerLog = (port: number) => async () => {
  const net = Object.values(networkInterfaces())
    .flat()
    .filter((v) => v?.family === 'IPv4')
    .sort((v) => (v!.internal ? -1 : 1)) as Array<NetworkInterfaceInfo>;

  console.info('Server started successfully!');
  console.info('You can now use the service.');

  net.forEach(({ internal, address }) =>
    console.info(
      `  ${(internal ? 'Local:' : 'On Your Network:').padEnd(
        20,
        ' ',
      )}http://${address}:${port}`,
    ),
  );
};
