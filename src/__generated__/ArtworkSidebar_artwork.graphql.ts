/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_artwork = {
    readonly is_in_auction: boolean | null;
    readonly sale: {
        readonly is_closed: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"AuctionTimer_sale">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork" | "ArtworkSidebarMetadata_artwork" | "ArtworkSidebarAuctionPartnerInfo_artwork" | "ArtworkSidebarCurrentBidInfo_artwork" | "ArtworkSidebarBidAction_artwork" | "ArtworkSidebarCommercial_artwork" | "ArtworkSidebarPartnerInfo_artwork" | "ArtworkSidebarExtraLinks_artwork" | "SecurePayment_artwork" | "VerifiedSeller_artwork" | "AuthenticityCertificate_artwork">;
    readonly " $refType": "ArtworkSidebar_artwork";
};
export type ArtworkSidebar_artwork$data = ArtworkSidebar_artwork;
export type ArtworkSidebar_artwork$key = {
    readonly " $data"?: ArtworkSidebar_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebar_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "is_in_auction",
      "name": "isInAuction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "AuctionTimer_sale",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtists_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarMetadata_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCurrentBidInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBidAction_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCommercial_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarPartnerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarExtraLinks_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SecurePayment_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "VerifiedSeller_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "AuthenticityCertificate_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '1d64fc32746f33f53452d3d783513e05';
export default node;
