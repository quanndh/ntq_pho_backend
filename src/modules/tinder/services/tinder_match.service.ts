import { Injectable } from "@nestjs/common";
import { TinderMatchRepository } from "src/modules/tinder/repositories/match.repository";

@Injectable()
export class TinderMatchService {
  constructor(private readonly tinderMatchRepo: TinderMatchRepository) {}
}
