// import { ZNSConnect } from '../src';

// describe('index', () => {
//   describe('myPackage', () => {
//     it('should return a string containing the message', () => {
//       const resolveAddressMessage = {
//         primaryDomain: '.honey',
//         userOwnedDomains: ['sdfsdf.honey', 'web3og.honey'],
//       };
//       const resolveDomainMessage = '0x4e55a258471b843eB57e4Dc6F3545438D3418c90';
//       const getRegistryMessage = {
//         owner: '0x4e55a258471b843eB57e4Dc6F3545438D3418c90',
//         domainName: 'web3og',
//         lengthOfDomain: 6,
//         expirationDate: 1746101116n,
//       };
//       const getMetadataMessage =
//         '<svg width="160" height="160" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill="#000" d="M0 0h1000v1000H0z"/><path d="M1000 885c-178.771 139.55-551.222 50.439-1000 0v115h1000zM0 115c178.771-139.552 551.222-50.44 1000 0V0H0z" fill="#e37b3b"/><circle cx="50%" cy="180" r="70" fill="#e37b3b"/><text x="50%" y="200" text-anchor="middle" font-size="60" fill="#000" font-weight="bold" font-family="Futura">ZNS</text><text x="50%" y="755" font-size="100" text-anchor="middle" fill="#e37b3b" font-weight="bold" font-family="Futura">.honey</text></g><text x="50%" y="55%" text-anchor="middle" font-size="250" fill="#e37b3b" font-weight="bold" font-family="Futura">web3og</text></svg>';

//       const zns = ZNSConnect();

//       const resolveAddressResult = zns.resolveAddress(
//         'honey',
//         '0x4e55a258471b843eB57e4Dc6F3545438D3418c90'
//       );
//       const resolveDomainResult = zns.resolveDomain('web3og.honey');
//       const getRegistryResult = zns.getRegistry('web3og.honey');
//       const getMetadataResult = zns.getMetadata('web3og.honey');

//       expect(resolveAddressResult).toMatch(resolveAddressMessage);
//       expect(resolveDomainResult).toMatch(resolveDomainMessage);
//       expect(getRegistryResult).toMatch(getRegistryMessage);
//       expect(getMetadataResult).toMatch(getMetadataMessage);
//     });
//   });
// });
