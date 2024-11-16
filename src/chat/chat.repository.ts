import { Injectable } from '@nestjs/common';
import { Offer } from './types';

@Injectable()
export class ChatRepository {
  private offers: Offer[] = [];

  addOffer(offer: Offer) {
    this.offers.push(offer);
  }

  getOffers() {
    return this.offers;
  }

  findOfferByRoom(roomName: string) {
    return this.offers.find(offer => offer.roomName === roomName);
  }

  updateOffer(roomName: string, updates: Partial<Offer>) {
    const offerIndex = this.offers.findIndex(offer => offer.roomName === roomName);
    if (offerIndex !== -1) {
      this.offers[offerIndex] = { ...this.offers[offerIndex], ...updates };
      return this.offers[offerIndex];
    }
    return null;
  }
}