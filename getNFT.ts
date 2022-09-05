import { Connection } from '@metaplex/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import fs from "fs"
const run = async () => {
  const connection = new Connection('mainnet-beta');
  const mintaddress = 'Fd2ChEBvrwVQxNLywLL8XgDUKB1WwWVQhJAdXZNWP395';//Give the mint Address of any one nft of the collection
  const symbol = await Metadata.findByMint(connection, mintaddress).then(res => res.data.data.symbol)
  const creatoraddress = await Metadata.findByMint(connection, mintaddress).then(res => res.data.data.creators[0].address)
  const nfts = await Metadata.findMany(connection, { creators: [creatoraddress] }).then(res => {
    const mints = []
    for (const nft of res) {
      console.log(nft.data.mint)
      mints.push(nft.data.mint)
    }
    const data = JSON.stringify(mints)
    fs.writeFile(`${symbol}.json`, data, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  }).catch(err => console.log(err))





  console.log(nfts)
  // Metadata.findMany(connection,{mint: ownerPublickey, updateAuthority: "H7a7ukVSEdGr56mkkXDjQhH1gZjcvMqEeVfSxk2dLdUK", creators:["Dhh1ifvwJ8c6BbxJcHcrAjBa2Q3X4p6QbZST8JYiss1v"]} ).then(res=>console.log(res)).catch(err=>console.log(err));
  // const data = await Metadata.findByOwnerV3(connection, walletaddress)
  // console.log(data)

}
run();
