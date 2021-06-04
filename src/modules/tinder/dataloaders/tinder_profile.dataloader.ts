import DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { TinderProfileRepository } from "src/modules/tinder/repositories/tinder_profile.repository";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";

@Injectable({ scope: Scope.REQUEST })
export class TinderProfileDataloader extends DataLoader<number, TinderProfile> {
  constructor(
    private readonly tinderProfileRepository: TinderProfileRepository
  ) {
    super(async (ids: ReadonlyArray<number>) => {
      const rows = await this.tinderProfileRepository.findByIds([...ids]);
      return ids.map(
        (id) => rows.find((x) => x.id == id) || new Error("Not found")
      );
    });
  }
}
