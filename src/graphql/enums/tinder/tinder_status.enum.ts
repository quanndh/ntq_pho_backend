import { registerEnumType } from "@nestjs/graphql";

export enum TinderMatchStatus {
  REQUEST = "REQUEST",
  MATCHED = "MATCHED",
}

registerEnumType(TinderMatchStatus, {
  name: "TinderMatchStatus",
});
