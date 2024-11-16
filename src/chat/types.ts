export interface Offer {
    offererUserName: string;
    offer: RTCSessionDescriptionInit;
    offerIceCandidates: RTCIceCandidate[];
    answererUserName: string | null;
    answer: RTCSessionDescriptionInit | null;
    answererIceCandidates: RTCIceCandidate[];
    roomName: string;
  }