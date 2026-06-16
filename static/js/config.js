const baobabMarketplaceAddress = "0x17bECf61714566bd6F49F73519A4b48A81C1e358"
const klaytnMarketplaceAddress = "0x17bECf61714566bd6F49F73519A4b48A81C1e358" // to do : 반영
const goerliMarketplaceAddress = "0x2223E1E4C1431D0258bcF765fFe15c82C060512f"
var marketplaceAddress = ""

const marketplaceAbi = [{"inputs":[{"internalType":"address","name":"_nativeTokenWrapper","type":"address"},{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"string","name":"_contractURI","type":"string"},{"internalType":"address[]","name":"_trustedForwarders","type":"address[]"},{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timeBuffer","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bidBufferBps","type":"uint256"}],"name":"AuctionBuffersUpdated","type":"event","signature":"0x441ed6470e96704c3f8c9e70c209107078aab3f17311385e886081b91aa75088"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"closer","type":"address"},{"indexed":true,"internalType":"bool","name":"cancelled","type":"bool"},{"indexed":false,"internalType":"address","name":"auctionCreator","type":"address"},{"indexed":false,"internalType":"address","name":"winningBidder","type":"address"}],"name":"AuctionClosed","type":"event","signature":"0x572cdc5ca5e918473319d0f4737494e4709ac879a7d0bcd11ce1bef24b24e81d"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event","signature":"0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"assetContract","type":"address"},{"indexed":true,"internalType":"address","name":"lister","type":"address"},{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"indexed":false,"internalType":"struct IMarketplace.Listing","name":"listing","type":"tuple"}],"name":"ListingAdded","type":"event","signature":"0xece32629e121e60432d05d099ce96f74a8d943f47ab99d3afb66d448bddd1e9a"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"listingCreator","type":"address"},{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"indexed":false,"internalType":"struct IMarketplace.Listing","name":"listing","type":"tuple"}],"name":"ListingRemoved","type":"event","signature":"0x2cc3aa701480ede8abb6ceeeb3c722830f5a304af3be0c9a40ac8b29df247c20"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"listingCreator","type":"address"}],"name":"ListingUpdated","type":"event","signature":"0xbbea26162edf2bc6a0255bf144ec4dd044302a301ef7d32daa835a2ddacfdef0"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"offeror","type":"address"},{"indexed":true,"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalOfferAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"currency","type":"address"}],"name":"NewOffer","type":"event","signature":"0x8a412352601a288b3de40254a9de2ab14a497aa3638a7e558480680a56e2705d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"assetContract","type":"address"},{"indexed":true,"internalType":"address","name":"lister","type":"address"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantityBought","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalPricePaid","type":"uint256"}],"name":"NewSale","type":"event","signature":"0x306e6cde5eb293794d557a3a6c844de939e6206b05e6910451c512852bf654a5"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"platformFeeRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"platformFeeBps","type":"uint256"}],"name":"PlatformFeeInfoUpdated","type":"event","signature":"0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event","signature":"0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event","signature":"0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event","signature":"0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xa217fddf"},{"inputs":[],"name":"MAX_BPS","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xfd967f47"},{"inputs":[],"name":"bidBufferBps","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x4e03f28d"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xe8a3d485"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x248a9ca3"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x9010d07c"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xca15c873"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2f2ff15d"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x91d14854"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x572b6c05"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listings","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xde74e57b"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"offers","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"offeror","type":"address"},{"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"uint256","name":"expirationTimestamp","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xebdfbce5"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x36568abe"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xd547741f"},{"inputs":[],"name":"timeBuffer","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xec91f2a4"},{"inputs":[],"name":"totalListings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc78b616c"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winningBid","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"offeror","type":"address"},{"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"uint256","name":"expirationTimestamp","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xd4ac9b8c"},{"stateMutability":"payable","type":"receive","payable":true},{"inputs":[],"name":"contractType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xcb2ef6f7"},{"inputs":[],"name":"contractVersion","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xa0a8e460"},{"inputs":[],"name":"get_LISTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xfbd5f3d6"},{"inputs":[],"name":"get_ASSET_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x73a75da1"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function","signature":"0xf23a6e61"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function","signature":"0xbc197c81"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x150b7a02"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x01ffc9a7"},{"inputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"secondsUntilEndTime","type":"uint256"},{"internalType":"uint256","name":"quantityToList","type":"uint256"},{"internalType":"address","name":"currencyToAccept","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"}],"internalType":"struct IMarketplace.ListingParameters","name":"_params","type":"tuple"}],"name":"createListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x296f4e16"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"uint256","name":"_quantityToList","type":"uint256"},{"internalType":"uint256","name":"_reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"_buyoutPricePerToken","type":"uint256"},{"internalType":"address","name":"_currencyToAccept","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_secondsUntilEndTime","type":"uint256"}],"name":"updateListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xc4b5b15f"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"}],"name":"cancelDirectListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x7506c84a"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_buyFor","type":"address"},{"internalType":"uint256","name":"_quantityToBuy","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0x7687ab02"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_offeror","type":"address"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"}],"name":"acceptOffer","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xb13c0e63"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"uint256","name":"_quantityWanted","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"},{"internalType":"uint256","name":"_expirationTimestamp","type":"uint256"}],"name":"offer","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0x5fef45e7"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_closeFor","type":"address"}],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x6bab66ae"},{"inputs":[],"name":"getPlatformFeeInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xd45573f6"},{"inputs":[{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"}],"name":"setPlatformFeeInfo","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x1e7ac488"},{"inputs":[{"internalType":"uint256","name":"_timeBuffer","type":"uint256"},{"internalType":"uint256","name":"_bidBufferBps","type":"uint256"}],"name":"setAuctionBuffers","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xea0e0241"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x938e3d7b"},{"inputs":[{"internalType":"enum MarketplaceNew.FetchOperator","name":"_op","type":"uint8"}],"name":"listingsCountByType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x34f8c95d"},{"inputs":[{"internalType":"enum MarketplaceNew.FetchOperator","name":"_op","type":"uint8"},{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"}],"name":"fetchItems","outputs":[{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"internalType":"struct IMarketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x2fc3af57"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getItemById","outputs":[{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"internalType":"struct IMarketplace.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xcd2f0710"}]

const nftContractAbi =  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_defaultAdmin",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contractURI",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_max_verification",
        "type": "uint8"
      },
      {
        "internalType": "address[]",
        "name": "_marketers",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "_minting_fee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nextOtpIDToAdd",
        "type": "uint256"
      }
    ],
    "name": "AddedNextOtpID",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenIdToAddOtp",
        "type": "uint256"
      }
    ],
    "name": "AddedOtp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newRoyaltyRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newRoyaltyBps",
        "type": "uint256"
      }
    ],
    "name": "DefaultRoyalty",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "MINTING_FEE",
        "type": "uint256"
      }
    ],
    "name": "MintingFeeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "prevOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnerUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "platformFeeRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "platformFeeBps",
        "type": "uint256"
      }
    ],
    "name": "PlatformFeeInfoUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "PrimarySaleRecipientUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "royaltyRecipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "royaltyBps",
        "type": "uint256"
      }
    ],
    "name": "RoyaltyForToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "mintedTo",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenIdMinted",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "TokensMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "mintedTo",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenIdMinted",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "TokensMintedWithOtp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "mintedTo",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenIdMinted",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "royaltyRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "royaltyBps",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "primarySaleRecipient",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint128",
            "name": "validityStartTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "validityEndTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          }
        ],
        "indexed": false,
        "internalType": "struct ITokenERC721Cert.MintRequest",
        "name": "mintRequest",
        "type": "tuple"
      }
    ],
    "name": "TokensMintedWithSignature",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenIdToCheckOtp",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "otpTimes",
        "type": "uint8"
      }
    ],
    "name": "verifiedOtp",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BULK_MINTING_FEE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_VERIFICATION",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINTING_FEE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoleMember",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "data",
        "type": "bytes[]"
      }
    ],
    "name": "multicall",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "results",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextOtpIDToAdd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextTokenIdToMint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "platformFeeRecipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "primarySaleRecipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractType",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractVersion",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_marketer",
        "type": "address"
      }
    ],
    "name": "isMarketers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "royaltyRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "royaltyBps",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "primarySaleRecipient",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint128",
            "name": "validityStartTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "validityEndTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          }
        ],
        "internalType": "struct ITokenERC721Cert.MintRequest",
        "name": "_req",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenIdToCheckOtp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_otp",
        "type": "string"
      }
    ],
    "name": "verifyOtc",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "mintTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_otp",
        "type": "string"
      }
    ],
    "name": "mintToWithOtp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "salePrice",
        "type": "uint256"
      }
    ],
    "name": "royaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "royaltyRecipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "royaltyBps",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "primarySaleRecipient",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint128",
            "name": "validityStartTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "validityEndTimestamp",
            "type": "uint128"
          },
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          }
        ],
        "internalType": "struct ITokenERC721Cert.MintRequest",
        "name": "_req",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "mintWithSignature",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenIdMinted",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_saleRecipient",
        "type": "address"
      }
    ],
    "name": "setPrimarySaleRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "setMintingFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_royaltyRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_royaltyBps",
        "type": "uint256"
      }
    ],
    "name": "setDefaultRoyaltyInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_bps",
        "type": "uint256"
      }
    ],
    "name": "setRoyaltyInfoForToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_platformFeeRecipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_platformFeeBps",
        "type": "uint256"
      }
    ],
    "name": "setPlatformFeeInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "setContractURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenIdToAddOtp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_otp",
        "type": "string"
      }
    ],
    "name": "otpTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_otps",
        "type": "string[]"
      }
    ],
    "name": "addOtcAtOnce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlatformFeeInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDefaultRoyaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getRoyaltyInfoForToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "sendViaCall",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

self.erc721_bytecode ="0x6080604052600436106102905760003560e01c806275a3171461029557806301ffc9a7146102c857806306fdde03146102f8578063079fe40e1461031a578063081812fc14610353578063095ea7b314610373578063103a3fd61461039557806313af4035146103b557806318160ddd146103d55780631e7ac488146103eb578063238a47091461040b57806323b872dd1461042b578063248a9ca31461044b5780632a55205a1461046b5780632c4510f8146104995780632f2ff15d146104ac5780632f745c59146104cc57806336568abe146104ec5780633b1475a71461050c5780633f1528b11461052357806342842e0e1461055057806342966c68146105705780634cc157df146105905780634f6ccce7146105d257806352367568146105f2578063572b6c05146106055780635a8bfe6014610625578063600dd5ea146106455780636352211e146106655780636625253a146106855780636f4f2837146106a557806370a08231146106c55780638da5cb5b146106e55780639010d07c146106fa57806391d148541461071a578063938e3d7b1461073a57806395d89b411461075a5780639bcf7a151461076f578063a0a8e4601461078f578063a217fddf146107a3578063a22cb465146107b8578063ac9650d8146107d8578063b24f2d3914610805578063b88d4fde14610834578063bd92712214610854578063c87b56dd14610874578063ca15c87314610894578063cb2ef6f7146108b4578063d45573f6146108d9578063d547741f1461090f578063d642b4b11461092f578063d7a065aa14610946578063de9037741461095d578063e4dc4f551461099c578063e8a3d485146109af578063e985e9c5146109c4578063eb13554f146109e4578063f8c8b51714610a05575b600080fd5b3480156102a157600080fd5b506102b56102b0366004614022565b610a1c565b6040519081526020015b60405180910390f35b3480156102d457600080fd5b506102e86102e336600461408c565b610a4a565b60405190151581526020016102bf565b34801561030457600080fd5b5061030d610a76565b6040516102bf91906140f9565b34801561032657600080fd5b506101fa5461033b906001600160a01b031681565b6040516001600160a01b0390911681526020016102bf565b34801561035f57600080fd5b5061033b61036e366004614119565b610b09565b34801561037f57600080fd5b5061039361038e366004614132565b610b31565b005b3480156103a157600080fd5b506102e86103b036600461415e565b610c5d565b3480156103c157600080fd5b506103936103d036600461415e565b610ccd565b3480156103e157600080fd5b506101c7546102b5565b3480156103f757600080fd5b50610393610406366004614132565b610d81565b34801561041757600080fd5b50610393610426366004614119565b610e49565b34801561043757600080fd5b5061039361044636600461417b565b610e98565b34801561045757600080fd5b506102b5610466366004614119565b610ed0565b34801561047757600080fd5b5061048b6104863660046141bc565b610ee6565b6040516102bf9291906141de565b6102b56104a73660046141f7565b610f23565b3480156104b857600080fd5b506103936104c736600461425b565b611098565b3480156104d857600080fd5b506102b56104e7366004614132565b6110b4565b3480156104f857600080fd5b5061039361050736600461425b565b61114b565b34801561051857600080fd5b506102b56101f85481565b34801561052f57600080fd5b506102025461053e9060ff1681565b60405160ff90911681526020016102bf565b34801561055c57600080fd5b5061039361056b36600461417b565b6111d9565b34801561057c57600080fd5b5061039361058b366004614119565b6111f4565b34801561059c57600080fd5b506105b06105ab366004614119565b611270565b604080516001600160a01b03909316835261ffff9091166020830152016102bf565b3480156105de57600080fd5b506102b56105ed366004614119565b6112e0565b6102b5610600366004614328565b611375565b34801561061157600080fd5b506102e861062036600461415e565b61147f565b34801561063157600080fd5b506102b56106403660046143ff565b61149d565b34801561065157600080fd5b50610393610660366004614132565b6114cf565b34801561067157600080fd5b5061033b610680366004614119565b611567565b34801561069157600080fd5b5061053e6106a0366004614481565b61159d565b3480156106b157600080fd5b506103936106c036600461415e565b611887565b3480156106d157600080fd5b506102b56106e036600461415e565b6118de565b3480156106f157600080fd5b5061033b611965565b34801561070657600080fd5b5061033b6107153660046141bc565b61199d565b34801561072657600080fd5b506102e861073536600461425b565b6119b6565b34801561074657600080fd5b506103936107553660046144b3565b6119e2565b34801561076657600080fd5b5061030d611a01565b34801561077b57600080fd5b5061039361078a3660046144f4565b611a11565b34801561079b57600080fd5b50600161053e565b3480156107af57600080fd5b506102b5600081565b3480156107c457600080fd5b506103936107d3366004614529565b611ac5565b3480156107e457600080fd5b506107f86107f3366004614557565b611ad7565b6040516102bf91906145cb565b34801561081157600080fd5b506101fc546101fd546001600160a01b03909116906001600160801b03166105b0565b34801561084057600080fd5b5061039361084f36600461462d565b611bc4565b34801561086057600080fd5b5061039361086f366004614481565b611bfd565b34801561088057600080fd5b5061030d61088f366004614119565b611c3f565b3480156108a057600080fd5b506102b56108af366004614119565b611ce2565b3480156108c057600080fd5b506e151bdad95b915490cdcc8c50d95c9d608a1b6102b5565b3480156108e557600080fd5b506101fb546101fd546001600160a01b0390911690600160801b90046001600160801b03166105b0565b34801561091b57600080fd5b5061039361092a36600461425b565b611cfa565b34801561093b57600080fd5b506102b56102055481565b34801561095257600080fd5b506102b56102065481565b34801561096957600080fd5b5061097d6109783660046141f7565b611d16565b6040805192151583526001600160a01b039091166020830152016102bf565b6102e86109aa366004614132565b611d6d565b3480156109bb57600080fd5b5061030d611e13565b3480156109d057600080fd5b506102e86109df3660046146ac565b611ea2565b3480156109f057600080fd5b506101fb5461033b906001600160a01b031681565b348015610a1157600080fd5b506102b56101f95481565b6000600080516020614f71833981519152610a3681611fa3565b610a41858585611fb4565b95945050505050565b6000610a55826120e4565b80610a7057506001600160e01b0319821663152a902d60e11b145b92915050565b60606101938054610a86906146da565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab2906146da565b8015610aff5780601f10610ad457610100808354040283529160200191610aff565b820191906000526020600020905b815481529060010190602001808311610ae257829003601f168201915b5050505050905090565b6000610b1482612109565b50600090815261019760205260409020546001600160a01b031690565b6000610b3c82611567565b9050806001600160a01b0316836001600160a01b031603610bae5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b806001600160a01b0316610bc061212e565b6001600160a01b03161480610bdc5750610bdc816109df61212e565b610c4e5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610ba5565b610c588383612138565b505050565b600080805b6102045460ff82161015610cc657836001600160a01b03166102048260ff1681548110610c9157610c9161470e565b6000918252602090912001546001600160a01b031603610cb45760019150610cc6565b80610cbe8161473a565b915050610c62565b5092915050565b6000610cd881611fa3565b610ce36000836119b6565b610d2d5760405162461bcd60e51b815260206004820152601b60248201527a3732bb9037bbb732b9103737ba1036b7b23ab6329030b236b4b71760291b6044820152606401610ba5565b6101f780546001600160a01b038481166001600160a01b0319831681179093556040519116919082907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a3505050565b6000610d8c81611fa3565b612710821115610dd05760405162461bcd60e51b815260206004820152600f60248201526e65786365656473204d41585f42505360881b6044820152606401610ba5565b6101fd80546001600160801b03166001600160401b038416600160801b021790556101fb80546001600160a01b0319166001600160a01b0385169081179091556040518381527fe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304906020015b60405180910390a2505050565b6000610e5481611fa3565b610205829055610e65826096614759565b6102065560405182907f9a7c33ea6df1d6d7f2348eda287c9493ced6ba1e043a8e681f50075dc9cdd4ca90600090a25050565b610ea9610ea361212e565b826121a7565b610ec55760405162461bcd60e51b8152600401610ba590614770565b610c58838383612206565b600090815261012f602052604090206001015490565b600080600080610ef586611270565b90945084925061ffff169050612710610f0e8287614759565b610f1891906147be565b925050509250929050565b6000600260015403610f775760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ba5565b60026001556000610f8985858561239e565b90506000610f9a602087018761415e565b9050610fb281610fad60808901896147e0565b611fb4565b92506000610fc6604088016020890161415e565b6001600160a01b031614611036576040518060400160405280876020016020810190610ff2919061415e565b6001600160a01b0390811682526040898101356020938401526000878152610207845220835181546001600160a01b03191692169190911781559101516001909101555b61103f866124f9565b82816001600160a01b0316836001600160a01b03167f110d160a1bedeea919a88fbc4b2a9fb61b7e664084391b6ca2740db66fef80fe8960405161108391906148b8565b60405180910390a45050600180559392505050565b6110a182610ed0565b6110aa81611fa3565b610c5883836126a1565b60006110bf836118de565b82106111215760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610ba5565b506001600160a01b039190911660009081526101c560209081526040808320938352929052205490565b61115361212e565b6001600160a01b0316816001600160a01b0316146111cb5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610ba5565b6111d582826126c4565b5050565b610c5883838360405180602001604052806000815250611bc4565b6111ff610ea361212e565b6112645760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201526f1b995c881b9bdc88185c1c1c9bdd995960821b6064820152608401610ba5565b61126d816126e7565b50565b600081815261020760209081526040808320815180830190925280546001600160a01b0316808352600190910154928201929092528291156112b857805160208201516112d6565b6101fc546101fd546001600160a01b03909116906001600160801b03165b9250925050915091565b60006112ec6101c75490565b821061134f5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610ba5565b6101c782815481106113635761136361470e565b90600052602060002001549050919050565b6000600080516020614f7183398151915261138f81611fa3565b6102065434146113f05760405162461bcd60e51b815260206004820152602660248201527f46656573206d75737420626520657175616c20746f2042554c4b5f4d494e54496044820152654e475f46454560d01b6064820152608401610ba5565b6102045460009060010361142157600a6102065460026114109190614759565b61141a91906147be565b905061144c565b610204546001101561144c57600a61020654600361143f9190614759565b61144991906147be565b90505b611456848261277e565b6101f954604051600080516020614f2a83398151915290600090a26101f9549250505b50919050565b6001600160a01b031660009081526099602052604090205460ff1690565b6000600080516020614f718339815191526114b781611fa3565b6114c48787878787612823565b979650505050505050565b60006114da81611fa3565b6127108211156114fc5760405162461bcd60e51b8152600401610ba5906149aa565b6101fc80546001600160a01b0319166001600160a01b0385169081179091556101fd80546001600160801b0319166001600160801b0385161790556040518381527f90d7ec04bcb8978719414f82e52e4cb651db41d0e6f8cea6118c2191e6183adb90602001610e3c565b600081815261019560205260408120546001600160a01b031680610a705760405162461bcd60e51b8152600401610ba5906149d6565b604080516000808252602080830180855283519020878352610201909152838220919390926115cd929101614a08565b604051602081830303815290604052805190602001200361161e5760405162461bcd60e51b815260206004820152600b60248201526a04e6f2053617665644f74760ac1b6044820152606401610ba5565b6040805160008152602081018083528151902091611640918691869101614a7e565b604051602081830303815290604052805190602001200361168c5760405162461bcd60e51b815260206004820152600660248201526504e6f204f74760d41b6044820152606401610ba5565b828260405160200161169f929190614a7e565b60408051601f198184030181528282528051602091820120600088815261020183529290922091926116d2929101614a08565b604051602081830303815290604052805190602001201461171d5760405162461bcd60e51b81526020600482015260056024820152642153616d6560d81b6044820152606401610ba5565b604080516000808252602080830180855283519020888352610203909152908390205460f81b6001600160f81b03191692820192909252604101604051602081830303815290604052805190602001200361178a57600084815261020360205260409020805460ff191690555b6102025460ff16156117f157610202546000858152610203602052604090205460ff9182169116106117f15760405162461bcd60e51b815260206004820152601060248201526f26b0bc102b32b934b334b1b0ba34b7b760811b6044820152606401610ba5565b60008481526102036020526040812080546001929061181490849060ff16614a8e565b82546101009290920a60ff818102199093169183160217909155600086815261020360205260408082205490519216925086917f394a4aea4c53a56cdb1a2156ba1075b38024e7a5a3823ebca35740a68266b7329190a3506000838152610203602052604090205460ff165b9392505050565b600061189281611fa3565b6101fa80546001600160a01b0319166001600160a01b0384169081179091556040517f299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b33390600090a25050565b60006001600160a01b0382166119485760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610ba5565b506001600160a01b03166000908152610196602052604090205490565b6101f7546000906119809082906001600160a01b03166119b6565b61198a5750600090565b6101f7546001600160a01b03165b905090565b600082815261016160205260408120611880908361298d565b600091825261012f602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60006119ed81611fa3565b6101fe6119fb838583614b0a565b50505050565b60606101948054610a86906146da565b6000611a1c81611fa3565b612710821115611a3e5760405162461bcd60e51b8152600401610ba5906149aa565b6040805180820182526001600160a01b03858116808352602080840187815260008a81526102078352869020945185546001600160a01b031916941693909317845591516001909301929092559151848152909186917f7365cf4122f072a3365c20d54eff9b38d73c096c28e1892ec8f5b0e403a0f12d910160405180910390a350505050565b6111d5611ad061212e565b8383612999565b6060816001600160401b03811115611af157611af161428b565b604051908082528060200260200182016040528015611b2457816020015b6060815260200190600190039081611b0f5790505b50905060005b82811015610cc657611b9430858584818110611b4857611b4861470e565b9050602002810190611b5a91906147e0565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612a6492505050565b828281518110611ba657611ba661470e565b60200260200101819052508080611bbc90614bc4565b915050611b2a565b611bd5611bcf61212e565b836121a7565b611bf15760405162461bcd60e51b8152600401610ba590614770565b6119fb84848484612b4d565b600080516020614f71833981519152611c1581611fa3565b611c20848484612b80565b6040518490600080516020614fb183398151915290600090a250505050565b600081815261020060205260409020805460609190611c5d906146da565b80601f0160208091040260200160405190810160405280929190818152602001828054611c89906146da565b8015611cd65780601f10611cab57610100808354040283529160200191611cd6565b820191906000526020600020905b815481529060010190602001808311611cb957829003601f168201915b50505050509050919050565b600081815261016160205260408120610a7090612bd6565b611d0382610ed0565b611d0c81611fa3565b610c5883836126c4565b6000806000611d26868686612be0565b61012087013560009081526101ff602052604090205490915060ff16158015611d625750611d62600080516020614f71833981519152826119b6565b969095509350505050565b6000806000846001600160a01b03168460405160006040518083038185875af1925050503d8060008114611dbd576040519150601f19603f3d011682016040523d82523d6000602084013e611dc2565b606091505b509150915081611e0b5760405162461bcd60e51b81526020600482015260146024820152732330b4b632b2103a379039b2b7321022ba3432b960611b6044820152606401610ba5565b509392505050565b6101fe8054611e21906146da565b80601f0160208091040260200160405190810160405280929190818152602001828054611e4d906146da565b8015611e9a5780601f10611e6f57610100808354040283529160200191611e9a565b820191906000526020600020905b815481529060010190602001808311611e7d57829003601f168201915b505050505081565b6001600160a01b0391821660009081526101986020908152604080832093909416825291909152205460ff1690565b6001600160a01b03163b151590565b611eea82826119b6565b6111d557600082815261012f602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611f2461212e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000611880836001600160a01b038416612c3c565b6000611f883361147f565b15611f9a575060131936013560601c90565b503390565b3390565b61126d81611faf61212e565b612c8b565b6101f88054906001906000611fc98385614bdd565b909155505081611feb5760405162461bcd60e51b8152600401610ba590614bf0565b600081815261020060205260409020612005838583614b0a565b506120108482612cef565b6102055434146120325760405162461bcd60e51b8152600401610ba590614c13565b6102045460009060010361206357600a6102055460026120529190614759565b61205c91906147be565b905061208e565b610204546001101561208e57600a6102055460036120819190614759565b61208b91906147be565b90505b61209781612d09565b5081856001600160a01b03167f9d89e36eadf856db0ad9ffb5a569e07f95634dddd9501141ecf04820484ad0dc86866040516120d4929190614c54565b60405180910390a3509392505050565b60006001600160e01b0319821663780e9d6360e01b1480610a705750610a7082612d70565b61211281612db0565b61126d5760405162461bcd60e51b8152600401610ba5906149d6565b6000611998611f7d565b60008181526101976020526040902080546001600160a01b0319166001600160a01b038416908117909155819061216e82611567565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806121b383611567565b9050806001600160a01b0316846001600160a01b031614806121da57506121da8185611ea2565b806121fe5750836001600160a01b03166121f384610b09565b6001600160a01b0316145b949350505050565b826001600160a01b031661221982611567565b6001600160a01b03161461227d5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610ba5565b6001600160a01b0382166122df5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610ba5565b6122ea838383612dce565b6122f5600082612138565b6001600160a01b03831660009081526101966020526040812080546001929061231f908490614c68565b90915550506001600160a01b03821660009081526101966020526040812080546001929061234e908490614bdd565b90915550506000818152610195602052604080822080546001600160a01b0319166001600160a01b038681169182179092559151849391871691600080516020614f9183398151915291a4505050565b60008060006123ae868686611d16565b91509150816123f35760405162461bcd60e51b8152602060048201526011602482015270696e76616c6964207369676e617475726560781b6044820152606401610ba5565b42612405610100880160e08901614c7b565b6001600160801b03161115801561243657504261242a61012088016101008901614c7b565b6001600160801b031610155b6124745760405162461bcd60e51b815260206004820152600f60248201526e1c995c5d595cdd08195e1c1a5c9959608a1b6044820152606401610ba5565b6000612483602088018861415e565b6001600160a01b0316036124cf5760405162461bcd60e51b81526020600482015260136024820152721c9958da5c1a595b9d081d5b9919599a5b9959606a1b6044820152606401610ba5565b61012086013560009081526101ff60205260409020805460ff191660011790559150509392505050565b8060a001356000036125085750565b6101fd5460a0820135906000906127109061253390600160801b90046001600160801b031684614759565b61253d91906147be565b905073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee61256460e0850160c0860161415e565b6001600160a01b0316036125bf578134146125ba5760405162461bcd60e51b815260206004820152601660248201527536bab9ba1039b2b732103a37ba30b610383934b1b29760511b6044820152606401610ba5565b612602565b34156126025760405162461bcd60e51b81526020600482015260126024820152716d73672076616c7565206e6f74207a65726f60701b6044820152606401610ba5565b600080612615608086016060870161415e565b6001600160a01b03161461263857612633608085016060860161415e565b612646565b6101fa546001600160a01b03165b905061267661265b60e0860160c0870161415e565b61266361212e565b6101fb546001600160a01b031685612eae565b6119fb61268960e0860160c0870161415e565b61269161212e565b8361269c8688614c68565b612eae565b6126ab8282611ee0565b600082815261016160205260409020610c589082611f68565b6126ce8282612ef4565b600082815261016160205260409020610c589082612f7a565b60006126f282611567565b905061270081600084612dce565b61270b600083612138565b6001600160a01b038116600090815261019660205260408120805460019290612735908490614c68565b90915550506000828152610195602052604080822080546001600160a01b0319169055518391906001600160a01b03841690600080516020614f91833981519152908390a45050565b6101f95460005b83518110156127e8578381815181106127a0576127a061470e565b6020026020010151610201600084815260200190815260200160002090816127c89190614c96565b506127d4826001614bdd565b9150806127e081614bc4565b915050612785565b506101f981905561020454156128035761280182612d09565b505b6101f954604051600080516020614f2a83398151915290600090a2505050565b6101f880549060019060006128388385614bdd565b90915550508361285a5760405162461bcd60e51b8152600401610ba590614bf0565b600081815261020060205260409020612874858783614b0a565b50816128925760405162461bcd60e51b8152600401610ba590614d4f565b6000818152610201602052604090206128ac838583614b0a565b506128b78682612cef565b6102055434146128d95760405162461bcd60e51b8152600401610ba590614c13565b6102045460009060010361290a57600a6102055460026128f99190614759565b61290391906147be565b9050612935565b610204546001101561293557600a6102055460036129289190614759565b61293291906147be565b90505b61293e81612d09565b5081876001600160a01b03167f1089b6157f0a6c156f2690dcfd0202dd56604d89ae41e0b6e6e7cac14561b768888860405161297b929190614c54565b60405180910390a35095945050505050565b60006118808383612f8f565b816001600160a01b0316836001600160a01b0316036129f65760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152606401610ba5565b6001600160a01b0383811660008181526101986020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6060612a6f83611ed1565b612aca5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610ba5565b600080846001600160a01b031684604051612ae59190614d72565b600060405180830381855af49150503d8060008114612b20576040519150601f19603f3d011682016040523d82523d6000602084013e612b25565b606091505b5091509150610a418282604051806060016040528060278152602001614f4a60279139612fb9565b612b58848484612206565b612b6484848484612ff2565b6119fb5760405162461bcd60e51b8152600401610ba590614d8e565b80612b9d5760405162461bcd60e51b8152600401610ba590614d4f565b600083815261020160205260409020612bb7828483614b0a565b506040518390600080516020614fb183398151915290600090a2505050565b6000610a70825490565b60006121fe83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612c369250612c2a9150889050613101565b8051906020012061323b565b90613289565b6000818152600183016020526040812054612c8357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610a70565b506000610a70565b612c9582826119b6565b6111d557612cad816001600160a01b031660146132a5565b612cb88360206132a5565b604051602001612cc9929190614de0565b60408051601f198184030181529082905262461bcd60e51b8252610ba5916004016140f9565b6111d5828260405180602001604052806000815250613440565b600080805b6102045460ff82161015610cc657612d5c6102048260ff1681548110612d3657612d3661470e565b600091825260209091200154610204546001600160a01b03909116906109aa90876147be565b915080612d688161473a565b915050612d0e565b60006001600160e01b031982166380ac58cd60e01b1480612da157506001600160e01b03198216635b5e139f60e01b145b80610a705750610a7082613473565b600090815261019560205260409020546001600160a01b0316151590565b612dd9838383613498565b612df2600080516020614f0a83398151915260006119b6565b158015612e0757506001600160a01b03831615155b8015612e1b57506001600160a01b03821615155b15610c5857612e38600080516020614f0a833981519152846119b6565b80612e565750612e56600080516020614f0a833981519152836119b6565b610c585760405162461bcd60e51b815260206004820152602360248201527f7265737472696374656420746f205452414e534645525f524f4c4520686f6c6460448201526265727360e81b6064820152608401610ba5565b80156119fb5773eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b03851601612ee857612ee38282613552565b6119fb565b6119fb848484846135f4565b612efe82826119b6565b156111d557600082815261012f602090815260408083206001600160a01b03851684529091529020805460ff19169055612f3661212e565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000611880836001600160a01b038416613647565b6000826000018281548110612fa657612fa661470e565b9060005260206000200154905092915050565b60608315612fc8575081611880565b825115612fd85782518084602001fd5b8160405162461bcd60e51b8152600401610ba591906140f9565b6000613006846001600160a01b0316611ed1565b156130f657836001600160a01b031663150b7a0261302261212e565b8786866040518563ffffffff1660e01b81526004016130449493929190614e4f565b6020604051808303816000875af192505050801561307f575060408051601f3d908101601f1916820190925261307c91810190614e8c565b60015b6130dc573d8080156130ad576040519150601f19603f3d011682016040523d82523d6000602084013e6130b2565b606091505b5080516000036130d45760405162461bcd60e51b8152600401610ba590614d8e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506121fe565b506001949350505050565b60607f86633b4ffa94b7c3d316ca70d7d2700f3fdfa7a7806efd31499b513d9176692e613131602084018461415e565b613141604085016020860161415e565b6040850135613156608087016060880161415e565b61316360808801886147e0565b604051613171929190614a7e565b60405190819003902060a088013561318f60e08a0160c08b0161415e565b6131a06101008b0160e08c01614c7b565b6131b26101208c016101008d01614c7b565b60408051602081019b909b526001600160a01b03998a16908b015296881660608a0152608089019590955292861660a088015260c087019190915260e08601529092166101008401526001600160801b03918216610120808501919091529116610140830152830135610160820152610180016040516020818303038152906040529050919050565b6000610a7061324861373a565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b600080600061329885856137b5565b91509150611e0b816137fa565b606060006132b4836002614759565b6132bf906002614bdd565b6001600160401b038111156132d6576132d661428b565b6040519080825280601f01601f191660200182016040528015613300576020820181803683370190505b509050600360fc1b8160008151811061331b5761331b61470e565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061334a5761334a61470e565b60200101906001600160f81b031916908160001a905350600061336e846002614759565b613379906001614bdd565b90505b60018111156133f1576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106133ad576133ad61470e565b1a60f81b8282815181106133c3576133c361470e565b60200101906001600160f81b031916908160001a90535060049490941c936133ea81614ea9565b905061337c565b5083156118805760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610ba5565b61344a83836139ab565b6134576000848484612ff2565b610c585760405162461bcd60e51b8152600401610ba590614d8e565b60006001600160e01b03198216635a05180f60e01b1480610a705750610a7082613ad9565b6001600160a01b0383166134f5576134f0816101c7805460008381526101c860205260408120829055600182018355919091527fff6df30967a6a678f565c59a19e91e5c0dbb20cfe9f9bf26d7da6dea0fffa24c0155565b613518565b816001600160a01b0316836001600160a01b031614613518576135188382613b0e565b6001600160a01b03821661352f57610c5881613bb0565b826001600160a01b0316826001600160a01b031614610c5857610c588282613c65565b6000826001600160a01b03168260405160006040518083038185875af1925050503d806000811461359f576040519150601f19603f3d011682016040523d82523d6000602084013e6135a4565b606091505b5050905080610c585760405162461bcd60e51b815260206004820152601c60248201527b1b985d1a5d99481d1bdad95b881d1c985b9cd9995c8819985a5b195960221b6044820152606401610ba5565b816001600160a01b0316836001600160a01b031603156119fb57306001600160a01b0384160361363257612ee36001600160a01b0385168383613cab565b6119fb6001600160a01b038516848484613d01565b6000818152600183016020526040812054801561373057600061366b600183614c68565b855490915060009061367f90600190614c68565b90508181146136e457600086600001828154811061369f5761369f61470e565b90600052602060002001549050808760000184815481106136c2576136c261470e565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806136f5576136f5614ec0565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610a70565b6000915050610a70565b60006119987f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61376960335490565b6034546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b60008082516041036137eb5760208301516040840151606085015160001a6137df87828585613d39565b945094505050506137f3565b506000905060025b9250929050565b600081600481111561380e5761380e614ed6565b036138165750565b600181600481111561382a5761382a614ed6565b036138725760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b6044820152606401610ba5565b600281600481111561388657613886614ed6565b036138d35760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610ba5565b60038160048111156138e7576138e7614ed6565b0361393f5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610ba5565b600481600481111561395357613953614ed6565b0361126d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610ba5565b6001600160a01b038216613a015760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610ba5565b613a0a81612db0565b15613a565760405162461bcd60e51b815260206004820152601c60248201527b115490cdcc8c4e881d1bdad95b88185b1c9958591e481b5a5b9d195960221b6044820152606401610ba5565b613a6260008383612dce565b6001600160a01b038216600090815261019660205260408120805460019290613a8c908490614bdd565b90915550506000818152610195602052604080822080546001600160a01b0319166001600160a01b0386169081179091559051839290600080516020614f91833981519152908290a45050565b60006001600160e01b03198216637965db0b60e01b1480610a7057506301ffc9a760e01b6001600160e01b0319831614610a70565b60006001613b1b846118de565b613b259190614c68565b60008381526101c66020526040902054909150808214613b7b576001600160a01b03841660009081526101c56020908152604080832085845282528083205484845281842081905583526101c690915290208190555b5060009182526101c6602090815260408084208490556001600160a01b0390941683526101c581528383209183525290812055565b6101c754600090613bc390600190614c68565b60008381526101c860205260408120546101c78054939450909284908110613bed57613bed61470e565b90600052602060002001549050806101c78381548110613c0f57613c0f61470e565b60009182526020808320909101929092558281526101c890915260408082208490558582528120556101c7805480613c4957613c49614ec0565b6001900381819060005260206000200160009055905550505050565b6000613c70836118de565b6001600160a01b0390931660009081526101c56020908152604080832086845282528083208590559382526101c69052919091209190915550565b610c588363a9059cbb60e01b8484604051602401613cca9291906141de565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152613e1c565b6040516001600160a01b03808516602483015283166044820152606481018290526119fb9085906323b872dd60e01b90608401613cca565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115613d665750600090506003613e13565b8460ff16601b14158015613d7e57508460ff16601c14155b15613d8f5750600090506004613e13565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613de3573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116613e0c57600060019250925050613e13565b9150600090505b94509492505050565b6000613e71826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316613eee9092919063ffffffff16565b805190915015610c585780806020019051810190613e8f9190614eec565b610c585760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610ba5565b60606121fe848460008585613f0285611ed1565b613f4e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610ba5565b600080866001600160a01b03168587604051613f6a9190614d72565b60006040518083038185875af1925050503d8060008114613fa7576040519150601f19603f3d011682016040523d82523d6000602084013e613fac565b606091505b50915091506114c4828286612fb9565b6001600160a01b038116811461126d57600080fd5b8035613fdc81613fbc565b919050565b60008083601f840112613ff357600080fd5b5081356001600160401b0381111561400a57600080fd5b6020830191508360208285010111156137f357600080fd5b60008060006040848603121561403757600080fd5b833561404281613fbc565b925060208401356001600160401b0381111561405d57600080fd5b61406986828701613fe1565b9497909650939450505050565b6001600160e01b03198116811461126d57600080fd5b60006020828403121561409e57600080fd5b813561188081614076565b60005b838110156140c45781810151838201526020016140ac565b50506000910152565b600081518084526140e58160208601602086016140a9565b601f01601f19169290920160200192915050565b60208152600061188060208301846140cd565b6001600160a01b03169052565b60006020828403121561412b57600080fd5b5035919050565b6000806040838503121561414557600080fd5b823561415081613fbc565b946020939093013593505050565b60006020828403121561417057600080fd5b813561188081613fbc565b60008060006060848603121561419057600080fd5b833561419b81613fbc565b925060208401356141ab81613fbc565b929592945050506040919091013590565b600080604083850312156141cf57600080fd5b50508035926020909101359150565b6001600160a01b03929092168252602082015260400190565b60008060006040848603121561420c57600080fd5b83356001600160401b038082111561422357600080fd5b90850190610140828803121561423857600080fd5b9093506020850135908082111561424e57600080fd5b5061406986828701613fe1565b6000806040838503121561426e57600080fd5b82359150602083013561428081613fbc565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156142c9576142c961428b565b604052919050565b60006001600160401b038311156142ea576142ea61428b565b6142fd601f8401601f19166020016142a1565b905082815283838301111561431157600080fd5b828260208301376000602084830101529392505050565b6000602080838503121561433b57600080fd5b82356001600160401b038082111561435257600080fd5b818501915085601f83011261436657600080fd5b8135818111156143785761437861428b565b8060051b6143878582016142a1565b91825283810185019185810190898411156143a157600080fd5b86860192505b838310156143f2578235858111156143bf5760008081fd5b8601603f81018b136143d15760008081fd5b6143e28b89830135604084016142d1565b83525091860191908601906143a7565b9998505050505050505050565b60008060008060006060868803121561441757600080fd5b853561442281613fbc565b945060208601356001600160401b038082111561443e57600080fd5b61444a89838a01613fe1565b9096509450604088013591508082111561446357600080fd5b5061447088828901613fe1565b969995985093965092949392505050565b60008060006040848603121561449657600080fd5b8335925060208401356001600160401b0381111561405d57600080fd5b600080602083850312156144c657600080fd5b82356001600160401b038111156144dc57600080fd5b6144e885828601613fe1565b90969095509350505050565b60008060006060848603121561450957600080fd5b8335925060208401356141ab81613fbc565b801515811461126d57600080fd5b6000806040838503121561453c57600080fd5b823561454781613fbc565b915060208301356142808161451b565b6000806020838503121561456a57600080fd5b82356001600160401b038082111561458157600080fd5b818501915085601f83011261459557600080fd5b8135818111156145a457600080fd5b8660208260051b85010111156145b957600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561462057603f1988860301845261460e8583516140cd565b945092850192908501906001016145f2565b5092979650505050505050565b6000806000806080858703121561464357600080fd5b843561464e81613fbc565b9350602085013561465e81613fbc565b92506040850135915060608501356001600160401b0381111561468057600080fd5b8501601f8101871361469157600080fd5b6146a0878235602084016142d1565b91505092959194509250565b600080604083850312156146bf57600080fd5b82356146ca81613fbc565b9150602083013561428081613fbc565b600181811c908216806146ee57607f821691505b60208210810361147957634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff810361475057614750614724565b60010192915050565b8082028115828204841417610a7057610a70614724565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b6000826147db57634e487b7160e01b600052601260045260246000fd5b500490565b6000808335601e198436030181126147f757600080fd5b8301803591506001600160401b0382111561481157600080fd5b6020019150368190038213156137f357600080fd5b6000808335601e1984360301811261483d57600080fd5b83016020810192503590506001600160401b0381111561485c57600080fd5b8036038213156137f357600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b80356001600160801b0381168114613fdc57600080fd5b6001600160801b03169052565b602081526148d1602082016148cc84613fd1565b61410c565b60006148df60208401613fd1565b6148ec604084018261410c565b506040830135606083015261490360608401613fd1565b614910608084018261410c565b5061491e6080840184614826565b6101408060a08601526149366101608601838561486b565b925060a086013560c086015261494e60c08701613fd1565b915061495d60e086018361410c565b61496960e08701614894565b915061010061497a818701846148ab565b614985818801614894565b925050610120614997818701846148ab565b9590950135939094019290925250919050565b60208082526012908201527165786365656420726f79616c74792062707360701b604082015260600190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b6000808354614a16816146da565b60018281168015614a2e5760018114614a4357614a72565b60ff1984168752821515830287019450614a72565b8760005260208060002060005b85811015614a695781548a820152908401908201614a50565b50505082870194505b50929695505050505050565b8183823760009101908152919050565b60ff8181168382160190811115610a7057610a70614724565b601f821115610c5857600081815260208120601f850160051c81016020861015614ace5750805b601f850160051c820191505b81811015614aed57828155600101614ada565b505050505050565b600019600383901b1c191660019190911b1790565b6001600160401b03831115614b2157614b2161428b565b614b3583614b2f83546146da565b83614aa7565b6000601f841160018114614b635760008515614b515750838201355b614b5b8682614af5565b845550614bbd565b600083815260209020601f19861690835b82811015614b945786850135825560209485019460019092019101614b74565b5086821015614bb15760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b600060018201614bd657614bd6614724565b5060010190565b80820180821115610a7057610a70614724565b602080825260099082015268656d7074792075726960b81b604082015260600190565b60208082526021908201527f46656573206d75737420626520657175616c20746f204d494e54494e475f46456040820152604560f81b606082015260800190565b6020815260006121fe60208301848661486b565b81810381811115610a7057610a70614724565b600060208284031215614c8d57600080fd5b61188082614894565b81516001600160401b03811115614caf57614caf61428b565b614cc381614cbd84546146da565b84614aa7565b602080601f831160018114614cf25760008415614ce05750858301515b614cea8582614af5565b865550614aed565b600085815260208120601f198616915b82811015614d2157888601518255948401946001909101908401614d02565b5085821015614d3f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6020808252600990820152680656d707479206f74760bc1b604082015260600190565b60008251614d848184602087016140a9565b9190910192915050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b815260008351614e128160178501602088016140a9565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614e438160288401602088016140a9565b01602801949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090614e82908301846140cd565b9695505050505050565b600060208284031215614e9e57600080fd5b815161188081614076565b600081614eb857614eb8614724565b506000190190565b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b600060208284031215614efe57600080fd5b81516118808161451b56fe8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6caba07c382783b74ba2848e0bff70ba98066fb00ae38ad2492c725b20f8bd95ba416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c65649f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efc5e7ba43fb7ee223f383d9c88b105a5ae2dffb0f3e964f9e72c01a9819c303afa2646970667358221220e0961641668f2fac918910dd534bddb59f866419d19b54fc1e6832c6239d0fe364736f6c63430008110033"

self.marketplaceAbi = [{"inputs":[{"internalType":"address","name":"_nativeTokenWrapper","type":"address"},{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"string","name":"_contractURI","type":"string"},{"internalType":"address[]","name":"_trustedForwarders","type":"address[]"},{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timeBuffer","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bidBufferBps","type":"uint256"}],"name":"AuctionBuffersUpdated","type":"event","signature":"0x441ed6470e96704c3f8c9e70c209107078aab3f17311385e886081b91aa75088"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"closer","type":"address"},{"indexed":true,"internalType":"bool","name":"cancelled","type":"bool"},{"indexed":false,"internalType":"address","name":"auctionCreator","type":"address"},{"indexed":false,"internalType":"address","name":"winningBidder","type":"address"}],"name":"AuctionClosed","type":"event","signature":"0x572cdc5ca5e918473319d0f4737494e4709ac879a7d0bcd11ce1bef24b24e81d"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event","signature":"0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"assetContract","type":"address"},{"indexed":true,"internalType":"address","name":"lister","type":"address"},{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"indexed":false,"internalType":"struct IMarketplace.Listing","name":"listing","type":"tuple"}],"name":"ListingAdded","type":"event","signature":"0xece32629e121e60432d05d099ce96f74a8d943f47ab99d3afb66d448bddd1e9a"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"listingCreator","type":"address"},{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"indexed":false,"internalType":"struct IMarketplace.Listing","name":"listing","type":"tuple"}],"name":"ListingRemoved","type":"event","signature":"0x2cc3aa701480ede8abb6ceeeb3c722830f5a304af3be0c9a40ac8b29df247c20"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"listingCreator","type":"address"}],"name":"ListingUpdated","type":"event","signature":"0xbbea26162edf2bc6a0255bf144ec4dd044302a301ef7d32daa835a2ddacfdef0"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"offeror","type":"address"},{"indexed":true,"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalOfferAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"currency","type":"address"}],"name":"NewOffer","type":"event","signature":"0x8a412352601a288b3de40254a9de2ab14a497aa3638a7e558480680a56e2705d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"assetContract","type":"address"},{"indexed":true,"internalType":"address","name":"lister","type":"address"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantityBought","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalPricePaid","type":"uint256"}],"name":"NewSale","type":"event","signature":"0x306e6cde5eb293794d557a3a6c844de939e6206b05e6910451c512852bf654a5"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"platformFeeRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"platformFeeBps","type":"uint256"}],"name":"PlatformFeeInfoUpdated","type":"event","signature":"0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event","signature":"0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event","signature":"0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event","signature":"0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xa217fddf"},{"inputs":[],"name":"MAX_BPS","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xfd967f47"},{"inputs":[],"name":"bidBufferBps","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x4e03f28d"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xe8a3d485"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x248a9ca3"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x9010d07c"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xca15c873"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2f2ff15d"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x91d14854"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x572b6c05"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listings","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xde74e57b"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"offers","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"offeror","type":"address"},{"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"uint256","name":"expirationTimestamp","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xebdfbce5"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x36568abe"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xd547741f"},{"inputs":[],"name":"timeBuffer","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xec91f2a4"},{"inputs":[],"name":"totalListings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc78b616c"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winningBid","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"offeror","type":"address"},{"internalType":"uint256","name":"quantityWanted","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"uint256","name":"expirationTimestamp","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xd4ac9b8c"},{"stateMutability":"payable","type":"receive","payable":true},{"inputs":[],"name":"contractType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xcb2ef6f7"},{"inputs":[],"name":"contractVersion","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xa0a8e460"},{"inputs":[],"name":"get_LISTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xfbd5f3d6"},{"inputs":[],"name":"get_ASSET_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x73a75da1"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function","signature":"0xf23a6e61"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function","signature":"0xbc197c81"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x150b7a02"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x01ffc9a7"},{"inputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"secondsUntilEndTime","type":"uint256"},{"internalType":"uint256","name":"quantityToList","type":"uint256"},{"internalType":"address","name":"currencyToAccept","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"}],"internalType":"struct IMarketplace.ListingParameters","name":"_params","type":"tuple"}],"name":"createListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x296f4e16"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"uint256","name":"_quantityToList","type":"uint256"},{"internalType":"uint256","name":"_reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"_buyoutPricePerToken","type":"uint256"},{"internalType":"address","name":"_currencyToAccept","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_secondsUntilEndTime","type":"uint256"}],"name":"updateListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xc4b5b15f"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"}],"name":"cancelDirectListing","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x7506c84a"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_buyFor","type":"address"},{"internalType":"uint256","name":"_quantityToBuy","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0x7687ab02"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_offeror","type":"address"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"}],"name":"acceptOffer","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xb13c0e63"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"uint256","name":"_quantityWanted","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"},{"internalType":"uint256","name":"_expirationTimestamp","type":"uint256"}],"name":"offer","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0x5fef45e7"},{"inputs":[{"internalType":"uint256","name":"_listingId","type":"uint256"},{"internalType":"address","name":"_closeFor","type":"address"}],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x6bab66ae"},{"inputs":[],"name":"getPlatformFeeInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xd45573f6"},{"inputs":[{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"}],"name":"setPlatformFeeInfo","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x1e7ac488"},{"inputs":[{"internalType":"uint256","name":"_timeBuffer","type":"uint256"},{"internalType":"uint256","name":"_bidBufferBps","type":"uint256"}],"name":"setAuctionBuffers","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xea0e0241"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x938e3d7b"},{"inputs":[{"internalType":"enum MarketplaceNew.FetchOperator","name":"_op","type":"uint8"}],"name":"listingsCountByType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x34f8c95d"},{"inputs":[{"internalType":"enum MarketplaceNew.FetchOperator","name":"_op","type":"uint8"},{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"}],"name":"fetchItems","outputs":[{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"internalType":"struct IMarketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x2fc3af57"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getItemById","outputs":[{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"tokenSeller","type":"address"},{"internalType":"address","name":"tokenBuyer","type":"address"},{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"uint256","name":"reservePricePerToken","type":"uint256"},{"internalType":"uint256","name":"buyoutPricePerToken","type":"uint256"},{"internalType":"enum IMarketplace.TokenType","name":"tokenType","type":"uint8"},{"internalType":"enum IMarketplace.ListingType","name":"listingType","type":"uint8"},{"internalType":"enum IMarketplace.State","name":"state","type":"uint8"}],"internalType":"struct IMarketplace.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xcd2f0710"}]